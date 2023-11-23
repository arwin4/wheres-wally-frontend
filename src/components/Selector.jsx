import React from 'react';
import PropTypes from 'prop-types';

import './styles/Selector.css';

export default function Selector({ clickCoordinates }) {
  const { x, y } = clickCoordinates;
  return (
    <div className="selector" style={{ top: y, left: x }}>
      test
    </div>
  );
}

Selector.propTypes = {
  clickCoordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};
