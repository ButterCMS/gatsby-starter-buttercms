import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Faq = ({ data }) => {
  const FAQs = data.allButterCollection.edges[0].node.value
  const headline = data.allButterContentField.edges[0].node.value

  return (
    <Layout>
      <SEO title="FAQ - Frequently Asked Questions" />
      <h1
        style={{
          height: `30%`,
          color: `white`,
          display: `flex`,
          padding: `1rem`,
          alignItems: `center`,
          justifyContent: `center`,
          flexDirection: `column`,
          background: `linear-gradient(-45deg, rgb(29, 64, 86) 0%, rgb(60, 24, 78) 100%)`,
        }}
      >
        {headline}
      </h1>
      <div style={{ display: `flex`, padding: `10px` }}>
        {FAQs.map(faq => (
          <div
            style={{
              flexBasis: `50%`,
              padding: `10px`,
              background: `whitesmoke`,
              borderRadius: `10px`,
              margin: `5px`,
            }}
          >
            <h2 style={{ color: `#213b55` }}>{faq.question}</h2>
            <p style={{ fontSize: `1.5rem`}}>{faq.answer} </p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allButterCollection(filter: { id: { eq: "faq_items" } }) {
      edges {
        node {
          id
          value {
            question
            answer
          }
        }
      }
    }

    allButterContentField(filter: { id: { eq: "faq_headline" } }) {
      edges {
        node {
          id
          value
        }
      }
    }
  }
`
export default Faq
