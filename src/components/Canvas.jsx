import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles/Canvas.css';
import SelectorPopup from './selector/SelectorPopup';

export default function Canvas() {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 1, y: 1 });
  const [selectorVisible, setSelectorVisible] = useState(false);

  // Save click coordinates
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
    <div className="image-container noselect">
      <img
        className="search-image"
        src="assets/megapark-horizontal-crop.png"
        alt="Section of big park in Rollercoaster Tycoon"
      />
      {selectorVisible && (
        <SelectorPopup
          clickCoordinates={clickCoordinates}
          setSelectorVisible={setSelectorVisible}
        />
      )}
    </div>
  );
}
