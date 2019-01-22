import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  console.log(data)
  const home = data.home.edges[0].node
  const case_studies = data.case_studies.edges

  return (
    <Layout>
      <SEO
        title={home.seo_title}
        keywords={[`gatsby`, `application`, `react`]}
      />
      <div
        style={{
          height: `50%`,
          display: `flex`,
          padding: `1rem`,
          alignItems: `center`,
          justifyContent: `center`,
          flexDirection: `column`,
          background: `linear-gradient(-45deg, rgb(29, 64, 86) 0%, rgb(60, 24, 78) 100%)`,
        }}
      >
        <h1
          style={{
            textAlign: `center`,
            color: `white`,
            fontSize: `2.5rem`,
            fontWeight: `100`,
            maxWidth: `960px`,
          }}
        >
          {home.headline}
        </h1>
        <button
          style={{
            padding: `0.75rem`,
            backgroundColor: `white`,
            border: `none`,
            fontSize: `1.5rem`,
            borderRadius: `10px`,
          }}
        >
          {home.call_to_action}
        </button>
      </div>

      <h1 style={{ fontWeight: `100`, textAlign: `center` }}>Our Customers</h1>
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        {home.customer_logos.map(({ logo_image }) => (
          <img
            alt="customer logo"
            key={logo_image}
            style={{ width: `200px`, borderRadius: `10px` }}
            src={logo_image}
          />
        ))}

        <h1 style={{ fontWeight: `100` }}>Case Studies</h1>
        {case_studies.map(({ node: { id, slug, headline } }) => (
          <div key={id}>
            <Link to={`case-study/${slug}`}>{headline}</Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    home: allButterPage(filter: { slug: { eq: "homepage" } }) {
      edges {
        node {
          slug
          headline
          seo_title
          customer_logos {
            logo_image
          }
          hero_image
          call_to_action
        }
      }
    }
    case_studies: allButterPage(
      filter: { page_type: { eq: "customer_case_study" } }
    ) {
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
`

export default IndexPage
