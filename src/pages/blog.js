import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allButterPost.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />

        <div
          style={{
            alignItems: `center`,
            justifyContent: `center`,
            margin: `20px 0px 20px 0px`,
          }}
        >
          <div
            style={{
              maxWidth: `960px`,
              padding: `30px`,
            }}
          >
            {posts.map(({ node }) => {
              const title = node.seo_title || node.slug
              return (
                <div
                  key={node.slug}
                  style={{ margin: `10px`, padding:`10px` }}
                >
                  <h3>
                    <Link style={{ boxShadow: `none` }} to={`/blog/${node.slug}`}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.date}</small>
                  <p
                    dangerouslySetInnerHTML={{ __html: node.meta_description }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allButterPost {
      edges {
        node {
          id
          seo_title
          meta_description
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
            bio
            title
            linkedin_url
            facebook_url
            instagram_url
            pinterest_url
            twitter_handle
            profile_image
          }
          body
        }
      }
    }
  }
`
