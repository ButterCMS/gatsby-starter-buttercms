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
  pageTypes,
  locales
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


  // Paginate through all blog posts
  let page = 1;
  while(page !== null) {
    let postResult = null;

    try {
      postResult = await api.post.list({
        page: page, page_size: 100
      });
    } catch (err) {
      console.log('Error fetching posts', err);
    }

    let posts = postResult.data.data;
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
            mediaType: `text/plain`,
            contentDigest: crypto
              .createHash(`md5`)
              .update(JSON.stringify(post))
              .digest(`hex`)
          }
        }
      );

      createNode(gatsbyPost);
    });

    // If there's another page, we paginate
    page = postResult.data.meta.next_page;
  }
  async function create_nodes_collections (locale) {
    // Fetch content fields.
    if (contentFields) {
      const {
        keys: contentFieldKeys = [],
        ...contentFieldOptions
      } = contentFields;

      var params = {}

      if (locale) {
        contentFieldOptions.locale = locale
        params.locale = locale
      }

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
          if (locale) {
            var uniqueId = `${locale || 'en'}-${key}`
          } else {
            var uniqueId = key
          }
          const collectionNode = Object.assign({}, {
            id: uniqueId,
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
            ...params,
          })

          createNode(collectionNode)
        })

        //Create Node For Each Content Field
        allfields.forEach(({
          key,
          value
        }) => {
          if (locale) {
            var uniqueId = `${locale || 'en'}-${key}`
          } else {
            var uniqueId = key
          }
          const contentFieldNode = Object.assign({}, {
            id: uniqueId,
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
            ...params,
          })

          createNode(contentFieldNode)
        })
      }

      if (locales && locales.length > 0) {
        for (const locale of locales) {
          await create_nodes_collections(locale);
        }
      } else {
        await create_nodes_collections(null)
      }

    }
  }

  async function fetch_pages (locale) {
    // Fetch pages.
    if (!pageTypes) {
      pageTypes = []
    }
    const pagesResult = [];
    var params = {}

    if (locale) {
      params.locale = locale
    }

    pageTypes.push('*');
    
    try {
      for (let i = 0; i < pageTypes.length; i++) {
        const pageTypeResult = await api.page.list(pageTypes[i], {
          page_size: Number.MAX_SAFE_INTEGER,
          ...params,
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

    pagesResult.forEach(page => {
      const data = Object.assign({
        slug: page.slug
      }, page.fields);

      if (locale) {
        var uniqueId = `${locale || 'en'}-${page.slug}`
      } else {
        var uniqueId = page.slug
      }

      const gatsbyPage = Object.assign(data, {
        id: createNodeId(uniqueId),
        parent: null,
        children: [],
        internal: {
          type: refactoredEntityTypes.page,
          mediaType: `text/plain`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(data))
            .digest(`hex`)
        },
        ...params,
      });

      createNode(gatsbyPage);
    });
  }


  if (locales && locales.length > 0) {
    for (const locale of locales) {
      await fetch_pages(locale);
    }
  } else {
    await fetch_pages(null);
  }

  setPluginStatus({
    status: {
      lastFetched: Date.now()
    }
  });
};