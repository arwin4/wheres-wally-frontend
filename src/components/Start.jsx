import React from 'react';

export default function Start({ setGameOngoing }) {
  return (
    <button type="button" onClick={() => setGameOngoing(true)}>
      Start
    </button>
  );
}
