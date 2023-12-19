import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Start({ startGame }) {
  const [loading, setLoading] = useState(false);

  if (loading)
    return (
      <button className="start-button button" type="button">
        Loading...
      </button>
    );

  return (
    <button
      className="start-button button"
      type="button"
      onClick={() => {
        setLoading(true);
        startGame();
      }}
    >
      Let&apos;s go!
    </button>
  );
}

Start.propTypes = {
  startGame: PropTypes.func.isRequired,
};
