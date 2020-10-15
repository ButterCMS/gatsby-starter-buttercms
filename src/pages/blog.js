import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import IntroBanner from "../components/intro-banner";

import "./blog.css";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allButterPost.edges;
    const featuredPost = posts[0].node;

    return (
      <Layout location={this.props.location} headerClass="header_sticky">
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <IntroBanner>
          <h1>ButterCMS & Gatsby</h1>
          <h2>Blog Engine</h2>
        </IntroBanner>
        <div
          style={{
            alignItems: `center`,
            justifyContent: `center`,
            margin: `20px 0px 20px 0px`,
          }}
        >
          <div className="post post_featured">
            <Link to={`/blog/${featuredPost.slug}`} style={{ flex: `1 0 55%` }}>
              <div
                style={{
                  backgroundImage: `url('${featuredPost.featured_image}')`,
                }}
                className="post__image"
              ></div>
            </Link>
            <div style={{ flex: `1 0 45%`, padding: `20px` }}>
              {featuredPost.categories && (
                <div className="categories">
                  {featuredPost.categories.map(({ name, slug }) => (
                    <div className="categories__category" key={slug}>
                      {name}
                    </div>
                  ))}
                </div>
              )}
              <h3>
                <Link
                  style={{ boxShadow: `none` }}
                  to={`/blog/${featuredPost.slug}`}
                  className="post__title"
                >
                  {featuredPost.title}
                </Link>
              </h3>
              <div className="author">
                {featuredPost.author.profile_image && (
                  <div
                    style={{
                      backgroundImage: `url(${featuredPost.author.profile_image})`,
                    }}
                    className="author__image"
                  ></div>
                )}
                <div style={{ display: `flex`, flexDirection: `column` }}>
                  <h4 className="author__name">
                    {featuredPost.author.first_name}{" "}
                    {featuredPost.author.last_name}
                  </h4>
                  <small>
                    {new Date(featuredPost.created).toLocaleDateString()}
                  </small>
                </div>
              </div>
              <div
                className="post__summary"
                dangerouslySetInnerHTML={{
                  __html: featuredPost.summary,
                }}
              />
            </div>
          </div>

          <div className="posts">
            {posts.slice(1).map(({ node }) => {
              const title = node.title;
              return (
                <div key={node.slug} className="post">
                  <Link to={`/blog/${node.slug}`}>
                    <div
                      style={{
                        backgroundImage: `url('${node.featured_image}')`,
                      }}
                      className="post__image"
                    ></div>
                  </Link>
                  {node.categories && (
                    <div className="categories">
                      {node.categories.map(({ name, slug }) => (
                        <div className="categories__category" key={slug}>
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                  <h3>
                    <Link
                      style={{ boxShadow: `none` }}
                      to={`/blog/${node.slug}`}
                      className="post__title"
                    >
                      {title}
                    </Link>
                  </h3>
                  <div className="author">
                    {node.author.profile_image && (
                      <div
                        style={{
                          backgroundImage: `url(${node.author.profile_image})`,
                        }}
                        className="author__image"
                      ></div>
                    )}
                    <div style={{ display: `flex`, flexDirection: `column` }}>
                      <h4 className="author__name">
                        {node.author.first_name} {node.author.last_name}
                      </h4>
                      <small>
                        {new Date(node.created).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogIndex;

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
          title
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
          summary
          created
          updated
          body
          featured_image
          featured_image_alt
        }
      }
    }
  }
`;
