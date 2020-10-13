import { Link } from "gatsby";
import React from "react";

import "./footer.css";

const Footer = () => (
  <footer>
    © {new Date().getFullYear()}, built with
    {` `}
    <Link to="https://www.gatsbyjs.org">ButterCMS & Gatsby</Link>
  </footer>
);

export default Footer;
