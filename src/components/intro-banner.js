import React from "react";
import PropTypes from "prop-types";

import "./intro-banner.css";

const IntroBanner = ({ children }) => (
  <div className="intro-banner">{children}</div>
);

IntroBanner.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IntroBanner;
