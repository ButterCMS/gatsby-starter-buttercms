const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const customerCaseStudy = path.resolve(
    `./src/templates/customer-case-study.js`
  )

  let posts
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
    `)
  } catch (error) {
    console.log(`Error Running Querying Posts`, error)
  }
    
  posts = posts.data.allButterPost.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    // Create blog posts pages.
    createPage({
      path: `/blog/${post.node.slug}`,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
  })

  // Fetch Customer Case study pages
  let pages
  try {
    pages = await graphql(`
      {
        allButterPage(filter: { page_type: { eq: "customer_case_study" } }) {
          edges {
            node {
              id
              slug
              facebook_open_graph_title
              seo_title
              headline
              testimony
              customer_logo
            }
          }
        }
      }
    `)
  } catch (error) {
    console.log(`Error Running Querying Pages`, error)
  }

  //Create Customer Case study pages
  pages.data.allButterPage.edges.forEach(page => {
    createPage({
      path: `/case-study/${page.node.slug}`,
      component: customerCaseStudy,
      context: {
        slug: page.node.slug,
      },
    })
  })
}
