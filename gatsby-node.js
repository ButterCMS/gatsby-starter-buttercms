const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const pageTemplate = path.resolve(`./src/templates/page.js`);

  let posts;
  try {
    posts = await graphql(`
      {
        allButterPost {
          edges {
            node {
              id
              seo_title
              slug
              categories {
                name
                slug
              }
              author {
                first_name
                last_name
                email
                slug
                profile_image
              }
              body
            }
          }
        }
      }
    `);
  } catch (error) {
    console.log(`Error Running Querying Posts`, error);
  }

  posts = posts.data.allButterPost.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    // Create blog posts pages.
    createPage({
      path: `/blog/${post.node.slug}`,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    });
  });

  // Fetch pages
  let pages;
  try {
    pages = await graphql(`
      {
        allButterPage {
          edges {
            node {
              id
              meta {
                slug
                updated
                published
              }
              readme
              seo {
                title
                meta_description
              }
              twitter_card {
                title
                Description
                image
              }
              open_graph {
                title
                image
                Description
              }
            }
          }
        }
      }
    `);
  } catch (error) {
    console.log(`Error Running Querying Pages`, error);
  }

  //Create index pages
  pages.data.allButterPage.edges.forEach((page) => {
    createPage({
      path: `/${page.node.meta.slug}`,
      component: pageTemplate,
      context: {
        slug: page.node.meta.slug,
      },
    });
  });
};
