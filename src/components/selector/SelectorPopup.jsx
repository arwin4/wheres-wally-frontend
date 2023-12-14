import React from 'react';
import PropTypes from 'prop-types';

import '../styles/SelectorPopup.css';
import { Icon } from '@iconify/react';

import SelectionCarousel from './SelectionCarousel';

export default function SelectorPopup({
  clickCoordinates,
  setSelectorVisible,
  handleWallySelection,
}) {
  const { x, y } = clickCoordinates;

  // Selector dimensions
  const selectorIconSize = 75;
  const selectorWrapperWidth = 200;
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
      className="selector-popup"
      style={{
        top: selectorWrapperTop,
        left: selectorWrapperLeft,
        rowGap,
      }}
    >
      <Icon
        className="selector-icon"
        icon="pixelarticons:circle"
        width={selectorIconSize}
      />

      <div
        className="selector-menu"
        style={{
          height: selectorWrapperHeight,
          width: selectorWrapperWidth,
          order: selectorMenuOrder,
        }}
      >
        <button
          type="button"
          aria-label="Close selector"
          className="selector-close generic-button"
          onClick={() => setSelectorVisible(false)}
        >
          <Icon icon="pixelarticons:close" height={50} />
        </button>
        Which is it?
        <SelectionCarousel
          clickCoordinates={clickCoordinates}
          handleWallySelection={handleWallySelection}
        />
      </div>
    </div>
  );
}

SelectorPopup.propTypes = {
  clickCoordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  setSelectorVisible: PropTypes.func.isRequired,
  handleWallySelection: PropTypes.func.isRequired,
};
