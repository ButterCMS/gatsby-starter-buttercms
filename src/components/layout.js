import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import "./layout.css";

const Layout = ({ children, headerClass }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Header
          siteTitle={data.site.siteMetadata.title}
          headerClass={headerClass}
        />
        <div
          style={{
            margin: `0 auto`,
            alignItems: `center`,
            padding: `0 20px`,
            height: `100vh`,
          }}
        >
          {children}
          {/*<Footer></Footer>*/}
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headerClass: PropTypes.string,
};

export default Layout;
