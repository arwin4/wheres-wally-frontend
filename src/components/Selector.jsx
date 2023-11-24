import React from 'react';
import PropTypes from 'prop-types';

import './styles/Selector.css';
import { X } from 'lucide-react';

export default function Selector({ clickCoordinates, setSelectorVisible }) {
  const { x, y } = clickCoordinates;
  return (
    <div className="selector" style={{ top: y, left: x }}>
      test
      <button
        type="button"
        aria-label="Close selector"
        className="selector-close generic-button"
        onClick={() => setSelectorVisible(false)}
      >
        <X />
      </button>
    </div>
  );
}

Selector.propTypes = {
  clickCoordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  setSelectorVisible: PropTypes.func.isRequired,
};
