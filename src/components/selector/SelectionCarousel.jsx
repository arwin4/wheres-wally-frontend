import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';

import '../styles/SelectionCarousel.css';

import wallyList from '../../data/wallyList';

export default function SelectionCarousel({ clickCoordinates }) {
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
  }

  function handlePreviousImage() {
    if (hasPrevious) setImageIndex(imageIndex - 1);
  }

  async function handleWallySelection(wallyName) {
    const response = await fetch(`http://localhost:3000/wallies`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clickCoordinates,
        wallyName,
        userToken: localStorage.getItem('userToken'),
      }),
    });
    if (!response.ok) {
      throw new Error('Unable to verify your selection');
    }
    const body = await response.json();
    const { wallyValid, gameFinished } = body;

    if (!wallyValid) {
      toast.error(
        `That's not a 'wally'! Or you did not identify it correctly.`,
      );
    }

    if (wallyValid && !gameFinished) {
      // TODO: Add number
      toast.success('Nice! (number) more to go!');
    }

    if (gameFinished) {
      toast.success('Finished!');
    }
  }

  // send put request to verify-wally
  // possible responses:
  //  - wally: false, finished: false
  //    -> show toast: 'That's not a 'wally'! Or you did not identify it correctly.'
  //       close popup (setSelectorVisible(false))
  //  - wally: true, finished: false
  //    -> show toast: 'Nice! (number) more to go'
  //       close popup (setSelectorVisible(false))
  //  - wally: true, finished: true
  //    -> show toast: 'Well done! You've found all 'wallies'!
  //       render results screen

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
      <button
        type="button"
        onClick={() => handleWallySelection(wallyList[imageIndex].name)}
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
        className="next-image"
        onClick={handleNextImage}
      >
        <Icon icon="pixelarticons:chevron-right" height={50} />
      </button>
      <Toaster />
    </div>
  );
}

SelectionCarousel.propTypes = {
  clickCoordinates: PropTypes.objectOf(PropTypes.number).isRequired,
};
