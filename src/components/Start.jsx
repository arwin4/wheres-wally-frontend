import React from 'react';
import PropTypes from 'prop-types';

export default function Start({ setGameOngoing }) {
  return (
    <button type="button" onClick={() => setGameOngoing(true)}>
      Start
    </button>
  );
}

Start.propTypes = {
  setGameOngoing: PropTypes.func.isRequired,
};
