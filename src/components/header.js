import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import logo from '../images/logo.png'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: `linear-gradient(-45deg, #1d4056 0%, #3c184e 100%)`,
      padding: `0.5rem`,
      height: `66.5px`,
      display: `flex`,
      alignItems: `center`,
    }}
  >
    <Link
      to="/"
      style={{
        color: `white`,
        textDecoration: `none`,
      }}
    >
      <img src={logo} alt="logo" style={{ marginBottom: `0`, width: `150px` }} />
    </Link>
    <ul
      style={{
        listStyleType: `none`,
        display: `inherit`,
        padding: `5px`,
        margin: `0 0 0 auto`,
      }}
    >
      <li>
        <Link
          style={{ color: `white`, textDecoration: `none`, padding: `5px` }}
          to="/blog"
        >
          Blog
        </Link>
      </li>
    </ul>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
