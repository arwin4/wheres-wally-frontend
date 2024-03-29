import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

import '../styles/SelectionCarousel.css';

import wallyList from '../../data/wallyList';

export default function SelectionCarousel({
  clickCoordinates,
  handleWallySelection,
}) {
  // Cache all images in carousel on first open
  useEffect(() => {
    wallyList.forEach((wally) => {
      new Image().src = wally.imageUrl;
    });
  }, []);

  const [imageIndex, setImageIndex] = useState(0);
  const hasPrevious = imageIndex > 0;
  const hasNext = imageIndex < wallyList.length - 1;

  function handleNextImage() {
    if (hasNext) setImageIndex(imageIndex + 1);
    else setImageIndex(0);
  }

  function handlePreviousImage() {
    if (hasPrevious) setImageIndex(imageIndex - 1);
    else setImageIndex(wallyList.length - 1);
  }

  return (
    <div className="selection-carousel">
      <button
        type="button"
        aria-label="Previous image"
        className="previous-image carousel-arrow icon-button"
        onClick={handlePreviousImage}
      >
        <Icon icon="pixelarticons:chevron-left" height={50} />
      </button>
      <button
        className="selection-button icon-button"
        type="button"
        onClick={() =>
          handleWallySelection(wallyList[imageIndex].name, clickCoordinates)
        }
      >
        <img
          className="selection-image"
          src={wallyList[imageIndex].imageUrl}
          alt={wallyList[imageIndex].name}
        />
      </button>
      <button
        type="button"
        aria-label="Next image"
        className="next-image carousel-arrow icon-button"
        onClick={handleNextImage}
      >
        <Icon icon="pixelarticons:chevron-right" height={50} />
      </button>
    </div>
  );
}

SelectionCarousel.propTypes = {
  clickCoordinates: PropTypes.objectOf(PropTypes.number).isRequired,
  handleWallySelection: PropTypes.func.isRequired,
};
