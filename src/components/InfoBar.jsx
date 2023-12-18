import React from 'react';
import PropTypes from 'prop-types';

import './styles/InfoBar.css';
import { Icon } from '@iconify/react';

export default function InfoBar({ walliesFound, setGameOngoing }) {
  return (
    <div className="infobar">
      <button type="button" onClick={() => setGameOngoing(false)}>
        Leave game
      </button>

      <div className="track-wallies">
        <div className="wally-wrapper">
          <img
            className="tracked-wally"
            src="assets/wallies/fountain.png"
            alt="Fountain"
          />
          {walliesFound.includes('fountain') && (
            <Icon
              className="tracked-wally-overlay"
              icon="pixelarticons:radio-on"
              color="white"
              height={75}
            />
          )}
        </div>
        <div className="wally-wrapper">
          <img src="assets/wallies/slide.png" alt="Slide" />
          {walliesFound.includes('slide') && (
            <Icon
              className="tracked-wally-overlay"
              icon="pixelarticons:radio-on"
              color="white"
              height={75}
            />
          )}
        </div>
        <div className="wally-wrapper">
          <img
            src="assets/wallies/lonely-island.png"
            alt="Lonely island with person stranded on it"
          />
          {walliesFound.includes('lonely island') && (
            <Icon
              className="tracked-wally-overlay"
              icon="pixelarticons:radio-on"
              color="white"
              height={75}
            />
          )}
        </div>
      </div>
    </div>
  );
}

InfoBar.propTypes = {
  walliesFound: PropTypes.arrayOf(PropTypes.string).isRequired,
  setGameOngoing: PropTypes.func.isRequired,
};
