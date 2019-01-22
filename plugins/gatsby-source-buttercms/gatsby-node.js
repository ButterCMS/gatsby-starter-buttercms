const butter = require('buttercms');
const crypto = require('crypto');

const typePrefix = 'butter__';

const refactoredEntityTypes = {
  post: `${typePrefix}POST`,
  page: `${typePrefix}PAGE`,
  contentField: `${typePrefix}CONTENT_FIELD`,
  collection: `${typePrefix}COLLECTION`
};

exports.sourceNodes = async ({
  actions,
  getNode,
  getNodes,
  createNodeId,
  hasNodeChanged,
  store
}, {
  authToken,
  contentFields,
  pages,
  pageTypes
}) => {
  const {
    createNode,
    touchNode,
    setPluginStatus
  } = actions;

  // Authenticate ButterCMS API client.
  const api = butter(authToken, false, 20000);

  // Touch existing ButterCMS nodes so Gatsby doesn’t garbage collect them.
  Object.values(store.getState().nodes)
    .filter(n => n.internal.type.slice(0, 8) === typePrefix)
    .forEach(n => touchNode(n.id));

  // Fetch posts.
  let postResult;
  try {
    postResult = await api.post.list({
      page_size: Number.MAX_SAFE_INTEGER
    });
  } catch (err) {
    console.log('Error fetching posts', err);
  }

  // TODO Document non-ButterCMS field `date`.
  if (postResult.data.data) {
    const posts = postResult.data.data;
    posts.forEach(post => {
      const gatsbyPost = Object.assign({
        date: new Date(post.published).toLocaleDateString('en-US')
      },
        post, {
          id: createNodeId(post.slug),
          parent: null,
          children: [],
          internal: {
            type: refactoredEntityTypes.post,
            mediaType: `application/json`,
            contentDigest: crypto
              .createHash(`md5`)
              .update(JSON.stringify(post))
              .digest(`hex`)
          }
        }
      );

      createNode(gatsbyPost);
    });
  }
  // Fetch content fields.
  if (contentFields) {
    const {
      keys: contentFieldKeys = [],
      ...contentFieldOptions
    } = contentFields;

    var contentFieldsResult;
    try {
      contentFieldsResult = await api.content.retrieve(
        contentFieldKeys,
        contentFieldOptions
      );
    } catch (err) {
      console.log('Error fetching content fields', err);
    }

    if (contentFieldsResult.data.data) {

      const entries = Object.entries(contentFieldsResult.data.data)

      let allCollection = [],
        allfields = [];

      //Extract Collections and Content Fields into separate variables
      entries.forEach(([key, value]) => {
        if (typeof (value) == "object") {
          allCollection.push({
            key,
            value
          })
        } else {
          allfields.push({
            key,
            value
          })
        }
      })

      //Create Node For Each Collection
      allCollection.forEach(({
        key,
        value
      }) => {
        const collectionNode = Object.assign({}, {
          id: key,
          parent: null,
          children: [],
          key: key,
          value: value,
          internal: {
            type: refactoredEntityTypes.collection,
            content: JSON.stringify(value),
            contentDigest: crypto
              .createHash(`md5`)
              .update(JSON.stringify([key, value]))
              .digest(`hex`)
          },
        })

        createNode(collectionNode)
      })

      //Create Node For Each Content Field
      allfields.forEach(({
        key,
        value
      }) => {
        const contentFieldNode = Object.assign({}, {
          id: key,
          parent: null,
          children: [],
          key: key,
          value: value,
          internal: {
            type: refactoredEntityTypes.contentField,
            content: JSON.stringify(value),
            contentDigest: crypto
              .createHash(`md5`)
              .update(JSON.stringify([key, value]))
              .digest(`hex`)
          },
        })

        createNode(contentFieldNode)
      })

    }
  }

  // Fetch pages.
  if (pages || pageTypes) {
    const pagesResult = [];

    // Fetch single pages
    if (pages) {
      try {
        for (let i = 0; i < pages.length; i++) {
          const pageResult = await api.page.retrieve('*', pages[i], {
            preview: 1
          });
          pagesResult.push(pageResult.data.data);
        }
      } catch (err) {
        console.log('Error fetching pages', err);
      }
    }

    // Fetch page types
    if (pageTypes) {
      try {
        for (let i = 0; i < pageTypes.length; i++) {
          const pageTypeResult = await api.page.list(pageTypes[i], {
            page_size: Number.MAX_SAFE_INTEGER,
            preview: 1
          });
          pageTypeResult.data.data.forEach(page => {
            // allButterPage(filter: {page_type: {eq: "page_type"}})
            page.fields.page_type = pageTypes[i];
            pagesResult.push(page);
          });
        }
      } catch (err) {
        console.log('Error fetching page types', err);
      }
    }

    pagesResult.forEach(page => {
      const data = Object.assign({
        slug: page.slug
      }, page.fields);
      const gatsbyPage = Object.assign(data, {
        id: createNodeId(page.slug),
        parent: null,
        children: [],
        internal: {
          type: refactoredEntityTypes.page,
          mediaType: `application/json`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(data))
            .digest(`hex`)
        }
      });

      createNode(gatsbyPage);
    });
  }

  setPluginStatus({
    status: {
      lastFetched: Date.now()
    }
  });
};