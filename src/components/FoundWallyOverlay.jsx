import React from 'react';

import PropTypes from 'prop-types';

// Style
import './styles/FoundWallyOverlay.css';
import { Icon } from '@iconify/react';

// Display a check over every found wally
export default function FoundWallyOverlay({ foundWalliesCoordinates }) {
  return (
    <div>
      {foundWalliesCoordinates.map((wally) => (
        <div
          key={wally.top}
          className="found-wally-overlay"
          style={{
            top: wally.top,
            left: wally.left,
          }}
        >
          <Icon icon="pixelarticons:radio-on" color="white" height={100} />
        </div>
      ))}
    </div>
  );
}

FoundWallyOverlay.propTypes = {
  foundWalliesCoordinates: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.number),
  ).isRequired,
};
