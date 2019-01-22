import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.allButterPost.edges[0].node
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.seo_title} description={post.description} />
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            margin: `20px 0px 20px 0px`,
          }}
        >
          <div style={{ maxWidth: `960px`, padding: `30px` }}>
            <h1>{post.seo_title}</h1> <span>{post.date}</span> &bull;
            {post.categories.map(category => (
              <span>{category.name}</span>
            ))}
            <hr />
            <div
              style={{ paddingTop: `20px` }}
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
            <hr />
            <Bio />
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={`/blog/${previous.slug}`} rel="prev">
                    ← {previous.seo_title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={`/blog/${next.slug}`} rel="next">
                    {next.seo_title} →
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allButterPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          body
          seo_title
          date
          categories {
            name
          }
        }
      }
    }
  }
`
