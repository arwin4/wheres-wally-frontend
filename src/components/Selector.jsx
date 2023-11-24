import React from 'react';
import PropTypes from 'prop-types';

import './styles/Selector.css';
import { X, CircleDashed } from 'lucide-react';

export default function Selector({ clickCoordinates, setSelectorVisible }) {
  const { x, y } = clickCoordinates;
  const selectorSize = 75;
  return (
    <div
      className="selector"
      style={{ top: y - selectorSize / 2, left: x - selectorSize / 2 }}
    >
      <CircleDashed size={selectorSize} strokeWidth={2.5} />
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
