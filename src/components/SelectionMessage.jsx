import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function SelectionMessage({
  wallyVerification,
  setSelectionMessageVisible,
}) {
  useEffect(() => {
    setTimeout(() => {
      setSelectionMessageVisible(false);
    }, 3000);
  });

  const { wallyValid, gameFinished } = wallyVerification;

  let message = '';

  if (!wallyValid && !gameFinished) {
    message = `That's not a 'wally'! Or you did not identify it correctly.`;
  }

  if (wallyValid && !gameFinished) {
    // TODO: number
    message = `Nice! (number) more to go!`;
  }

  // gamefinished: resetWallies

  return <div>{message}</div>;
}

SelectionMessage.propTypes = {
  wallyVerification: PropTypes.objectOf(PropTypes.bool).isRequired,
  setSelectionMessageVisible: PropTypes.func.isRequired,
};
