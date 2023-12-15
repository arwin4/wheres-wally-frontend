import React from 'react';
import PropTypes from 'prop-types';

import './styles/Start.css';

export default function Start({ startGame }) {
  return (
    <button className="start-button" type="button" onClick={startGame}>
      Let&apos;s go!
    </button>
  );
}

Start.propTypes = {
  startGame: PropTypes.func.isRequired,
};
