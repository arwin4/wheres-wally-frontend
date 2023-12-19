import React from 'react';
import PropTypes from 'prop-types';

export default function Start({ startGame }) {
  return (
    <button className="start-button button" type="button" onClick={startGame}>
      Let&apos;s go!
    </button>
  );
}

Start.propTypes = {
  startGame: PropTypes.func.isRequired,
};
