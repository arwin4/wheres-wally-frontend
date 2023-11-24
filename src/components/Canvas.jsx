import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles/Canvas.css';
import Selector from './Selector';

export default function Canvas() {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 1, y: 1 });
  const [selectorVisible, setSelectorVisible] = useState(false);
  useEffect(() => {
    const image = document.querySelector('.search-image');
    image.addEventListener('click', (e) => {
      // Source for calculation: https://stackoverflow.com/a/42111623/22857578
      const rect = e.target.getBoundingClientRect();
      setClickCoordinates({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setSelectorVisible(true);
    });
  }, []);

  return (
    <div className="image-container">
      <img
        className="search-image"
        src="assets/megapark-horizontal-crop.png"
        alt="Section of big park in Rollercoaster Tycoon"
      />
      {selectorVisible && (
        <Selector
          clickCoordinates={clickCoordinates}
          setSelectorVisible={setSelectorVisible}
        />
      )}
    </div>
  );
}

Canvas.propTypes = {
  clickCoordinates: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};
