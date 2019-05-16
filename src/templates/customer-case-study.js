import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'


function CustomerCaseStudy({ data }) {
  const page = data.allButterPage.edges[0].node

  return (
    <Layout>
      <SEO
        title={page.facebook_open_graph_title}
        description={page.headline}
      />
      <div>
        <h1>{page.seo_title}</h1>
        <p>{page.headline}</p>
        <img alt="customer_logo" src={page.customer_logo} />
        <p>{page.testimonial}</p> 
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CaseStudyPageBySlug($slug: String!) {
    allButterPage(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          slug
          facebook_open_graph_title
          seo_title
          headline
          testimonial
          customer_logo
        }
      }
    }
  }
`

export default CustomerCaseStudy
