import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import '../styles/SelectionCarousel.css';

import itemList from '../../data/itemList';

export default function SelectionCarousel() {
  const [imageIndex, setImageIndex] = useState(0);

  const hasPrevious = imageIndex > 0;
  const hasNext = imageIndex < itemList.length - 1;

  function handleNextImage() {
    if (hasNext) setImageIndex(imageIndex + 1);
  }

  function handlePreviousImage() {
    if (hasPrevious) setImageIndex(imageIndex - 1);
  }

  return (
    <div className="selection-carousel">
      <button
        type="button"
        aria-label="Previous image"
        className="previous-image"
        onClick={handlePreviousImage}
      >
        <Icon icon="pixelarticons:chevron-left" height={50} />
      </button>
      <img
        className="selection-image"
        src={itemList[imageIndex].imageUrl}
        alt={itemList[imageIndex].name}
      />
      <button
        type="button"
        aria-label="Next image"
        className="next-image"
        onClick={handleNextImage}
      >
        <Icon icon="pixelarticons:chevron-right" height={50} />
      </button>
    </div>
  );
}
