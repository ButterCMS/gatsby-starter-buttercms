import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Product from "../components/product";
import ProductFeature from "../components/product-feature";
import IntroBanner from "../components/intro-banner";

const IndexPage = ({ data }) => {
  const sample_page = data.sample_page.edges[0].node;
  return (
    <Layout headerClass="header_sticky">
      <SEO
        title={sample_page.seo.title}
        keywords={[`gatsby`, `application`, `react`]}
      />
      <IntroBanner>
        <h1>ButterCMS & Gatsby</h1>
        <h2>
          Headless CMS{" "}
          <span style={{ color: `#fed700` }}>you'll melt over</span>
        </h2>
      </IntroBanner>
      <h1
        style={{
          textAlign: `center`,
          margin: `20px 0`,
        }}
      >
        {sample_page.twitter_card.title}
      </h1>
      <img
        src={sample_page.twitter_card.image}
        style={{
          maxWidth: `800px`,
          width: `80%`,
          margin: `20px auto`,
          display: `block`,
        }}
      ></img>
      <p>{sample_page.twitter_card.Description}</p>
      <article>
        {sample_page.sections.map(({ type, fields }, sectionKey) =>
          type === `product` ? (
            <Product
              key={sectionKey}
              headline={fields.headline}
              description={fields.description}
              screenshots={fields.screenshots}
            ></Product>
          ) : (
            type === `product_features` && (
              <ProductFeature
                key={sectionKey}
                headline={fields.headline}
                features={fields.features}
              ></ProductFeature>
            )
          )
        )}
      </article>
    </Layout>
  );
};
//GraphQl query to fetch example page data
export const query = graphql`
  {
    sample_page: allButterPage(filter: { slug: { eq: "sample-page" } }) {
      edges {
        node {
          id
          slug
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
          sections {
            type
            fields {
              headline
              description
              screenshots {
                image
                caption
              }
              features {
                headline
                subheadline
                image
                button_text
                button_link
              }
            }
          }
        }
      }
    }
  }
`;
export default IndexPage;
