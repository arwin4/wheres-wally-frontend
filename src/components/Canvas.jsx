import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/Canvas.css';
import Selector from './Selector';

export default function Canvas({ clickCoordinates, setClickCoordinates }) {
  useEffect(() => {
    const image = document.querySelector('.search-image');
    image.addEventListener('click', (e) => {
      // Source for calculation: https://stackoverflow.com/a/42111623/22857578
      const rect = e.target.getBoundingClientRect();
      setClickCoordinates({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    });
  }, []);

  return (
    <div className="image-container">
      <img
        className="search-image"
        src="assets/megapark-horizontal-crop.png"
        alt="Section of big park in Rollercoaster Tycoon"
      />
      <Selector clickCoordinates={clickCoordinates} />
    </div>
  );
}

Canvas.propTypes = {
  clickCoordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  setClickCoordinates: PropTypes.func.isRequired,
};
