import React from "react";
import PropTypes from "prop-types";

import "./product.css";

function Product({ headline, description, screenshots }) {
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: headline }}></h2>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
      {screenshots && (
        <div className="screenshots">
          {screenshots.map(({ image, caption }, key) => (
            <div key={key} className="screenshot">
              <img src={image} className="screenshot__image"></img>
              <div className="screenshot__caption">{caption}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const screenshotPropType = PropTypes.shape({
  image: PropTypes.string,
  caption: PropTypes.string,
});

Product.propTypes = {
  headline: PropTypes.string,
  description: PropTypes.string,
  screenshots: PropTypes.arrayOf(screenshotPropType),
};

export default Product;
