import React from 'react';
import PropTypes from 'prop-types';

export default function Start({ startGame }) {
  return (
    <button type="button" onClick={startGame}>
      Start
    </button>
  );
}

Start.propTypes = {
  startGame: PropTypes.func.isRequired,
};
