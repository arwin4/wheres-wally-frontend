import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/Canvas.css';

export default function Canvas({ setClickCoordinates }) {
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
      <div className="overlay">test</div>
    </div>
  );
}

Canvas.propTypes = {
  setClickCoordinates: PropTypes.func.isRequired,
};
