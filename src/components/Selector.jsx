import React from 'react';
import PropTypes from 'prop-types';

import './styles/Selector.css';
import { X, CircleDashed } from 'lucide-react';

export default function Selector({ clickCoordinates, setSelectorVisible }) {
  const { x, y } = clickCoordinates;

  // Selector dimensions
  const selectorIconSize = 75;
  const selectorWrapperWidth = 150;
  const selectorWrapperHeight = 200;
  const rowGap = 10;
  // Menu is below selector icon by default
  let selectorMenuOrder = 1;

  // Calculate offsets
  let selectorWrapperTop = y - selectorIconSize / 2;
  const selectorWrapperLeft = x - selectorWrapperWidth / 2;

  // Put the menu on top when user clicks near the bottom of the image,
  // preventing the menu from appearing outside the image
  if (y > 1000) {
    selectorMenuOrder = -1;
    selectorWrapperTop -= selectorWrapperHeight + rowGap; // Recalculate offset
  }

  return (
    <div
      className="selector-wrapper"
      style={{
        top: selectorWrapperTop,
        left: selectorWrapperLeft,
        rowGap,
      }}
    >
      <CircleDashed
        className="selector-icon"
        size={selectorIconSize}
        strokeWidth={2.5}
      />
      <div
        className="selector-menu"
        style={{ height: selectorWrapperHeight, order: selectorMenuOrder }}
      >
        <button
          type="button"
          aria-label="Close selector"
          className="selector-close generic-button"
          onClick={() => setSelectorVisible(false)}
        >
          <X />
        </button>
        <div className="item-1">One</div>
        <div className="item-2">Two</div>
      </div>
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
