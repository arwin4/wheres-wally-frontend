import React, { useEffect, useState } from 'react';
import './styles/Canvas.css';
import SelectorPopup from './selector/SelectorPopup';

export default function Canvas() {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 1, y: 1 });
  const [selectorVisible, setSelectorVisible] = useState(false);

  useEffect(() => {
    // TODO: Fix panning too fast

    const imageContainer = document.querySelector('.image-container');

    // Pan image on mouse drag
    let isMouseDown = false;
    let wasDragged = false;

    imageContainer.addEventListener('mousedown', () => {
      isMouseDown = true;
      wasDragged = false; // Reset on mousedown, or selector will never open
    });

    imageContainer.addEventListener('mouseup', () => {
      isMouseDown = false;
    });

    imageContainer.addEventListener('mousemove', (e) => {
      if (isMouseDown) {
        imageContainer.scrollTop -= e.movementY;
        imageContainer.scrollLeft -= e.movementX;
        wasDragged = true;
      }
    });

    // Save click coordinates
    const image = document.querySelector('.search-image');
    const rect = image.getBoundingClientRect();
    image.addEventListener('click', (e) => {
      // Prevent selector from showing on the end of a drag
      if (wasDragged) return;

      // Source for calculation: https://stackoverflow.com/a/42111623/22857578
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
        draggable="false"
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
