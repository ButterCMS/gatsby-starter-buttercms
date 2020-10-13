import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import "./header.css";
import logo from "../images/logo.png";

const Header = ({ headerClass }) => (
  <div className={`header${headerClass ? ` ${headerClass}` : ``}`}>
    <Link to="/" className="logo">
      <img
        src={logo}
        alt="logo"
        style={{ marginBottom: `0`, width: `150px` }}
      />
    </Link>
    <ul className="main-navigation">
      <li style={{ marginBottom: 0 }}>
        <Link className="main-navigation__link" to="/blog">
          Blog
        </Link>
      </li>
    </ul>
  </div>
);

Header.propTypes = {
  headerClass: PropTypes.string,
};

export default Header;
