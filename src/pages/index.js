import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const sample_page = data.sample_page.edges[0].node
  return (
    <Layout>
      <SEO
        title={sample_page.seo_title}
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
          {sample_page.headline}
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
          {sample_page.call_to_action}
        </button>
      </div>
      {/* <h1> {page.hero_image}</h1> */}
      <h1 style={{ fontWeight: `100`, textAlign: `center` }}>Our Customers</h1>
      <div
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        {sample_page.customer_logos.map(({ logo_image }, key) => (
          <img
            key={key}
            style={{ width: `200px`, borderRadius: `10px` }}
            src={logo_image}
            alt="logo"
          />
        ))}
      </div>
    </Layout>
  )
}
//GraphQl query to fetch example page data
export const query = graphql`
  {
    sample_page: allButterPage(filter: { slug: { eq: "sample-page" } }) {
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
  }
`
export default IndexPage