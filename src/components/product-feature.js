import React from "react";
import PropTypes from "prop-types";

import "./product-feature.css";

function ProductFeature({ headline, features }) {
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: headline }}></h2>
      {features && (
        <div className="features">
          {features.map(
            (
              { headline, subheadline, image, button_text, button_link },
              key
            ) => (
              <div key={key} className="feature">
                <div className="feature-header">
                  <h3 className="feature-header__title">{headline}</h3>
                  <a className="call-to-action" href={button_link}>
                    {button_text}
                  </a>
                </div>
                {subheadline && <h5>{subheadline}</h5>}
                <img src={image} className="feature__image"></img>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

const featurePropType = PropTypes.shape({
  headline: PropTypes.string,
  subheadline: PropTypes.string,
  image: PropTypes.string,
  button_text: PropTypes.string,
  button_link: PropTypes.string,
});

ProductFeature.propTypes = {
  headline: PropTypes.string,
  features: PropTypes.arrayOf(featurePropType),
};

export default ProductFeature;
