import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

// Components
import SelectorPopup from './selector/SelectorPopup';
import FoundWallyOverlay from './FoundWallyOverlay';

// Utils
import endTrackingGameDuration from '../utils/endTrackingGameDuration';

// Style
import './styles/Canvas.css';

export default function Canvas({
  setGameOngoing,
  setSubmitNameVisible,
  setWalliesFound,
}) {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 1, y: 1 });
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [foundWalliesCoordinates, setFoundWalliesCoordinates] = useState([]);
  const [clientY, setClientY] = useState(null);

  useEffect(() => {
    // Pan image on mouse drag
    const imageContainer = document.querySelector('.image-container');

    // Center image on load (roughly)
    imageContainer.scrollTo(600, 500);

    const image = document.querySelector('.search-image');

    let isMouseDown = false;
    let isMouseOut = false;
    let wasDragged = false;

    // Location of drag start, relative to viewport
    const start = { x: 0, y: 0 };

    image.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      isMouseOut = false;
      wasDragged = false; // Reset on mousedown, or selector will never reopen

      start.x = imageContainer.scrollLeft + e.clientX;
      start.y = imageContainer.scrollTop + e.clientY;
    });

    image.addEventListener('mouseup', () => {
      // Stop panning when mouse is up
      isMouseDown = false;
    });

    image.addEventListener('mousemove', (e) => {
      if (isMouseDown && !isMouseOut) {
        // ScrollTo calculation source: https://stackoverflow.com/a/68280346/22857578
        imageContainer.scrollTo(start.x - e.clientX, start.y - e.clientY);
        wasDragged = true;
      }
    });

    image.addEventListener('mouseout', () => {
      // Stop panning when mouse exits image
      isMouseOut = true;
      isMouseDown = false;
    });

    // Save click coordinates
    image.addEventListener('click', (e) => {
      // Prevent selector from showing on the end of a drag
      if (wasDragged) return;

      // Source for calculation: https://stackoverflow.com/a/42111623/22857578
      const rect = image.getBoundingClientRect();
      setClickCoordinates({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setClientY(e.clientY);
      setSelectorVisible(true);
    });
  }, []);

  const handleWallySelection = useCallback(
    async (wallyName, newClickCoordinates) => {
      setSelectorVisible(false);
      const response = await fetch(`http://localhost:3000/wallies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clickCoordinates: newClickCoordinates,
          wallyName,
          userToken: localStorage.getItem('userToken'),
        }),
      });
      if (!response.ok) {
        throw new Error('Unable to verify your selection');
      }
      const body = await response.json();
      const { wallyValid, wallyAlreadyFound, centerCoordinates, gameFinished } =
        body;

      if (!wallyValid) {
        toast.error(
          `That's not a 'wally'! Or you did not identify it correctly.`,
          { duration: 3000, id: 'wallyVerification' },
        );
      }

      if (wallyAlreadyFound) {
        toast.error('You already found this', {
          duration: 3000,
          id: 'wallyVerification',
        });
      }

      if (wallyValid && !wallyAlreadyFound && !gameFinished) {
        // Add location to found wally list, in order to display check
        setFoundWalliesCoordinates((current) => [
          ...current,
          centerCoordinates,
        ]);

        setWalliesFound((current) => [...current, wallyName]);

        // This assumes there are 3 wallies to be found.
        toast.success(
          `Nice! ${2 - foundWalliesCoordinates.length} more to go!`,
          {
            duration: 3000,
            id: 'wallyVerification',
          },
        );
      }

      if (gameFinished && !wallyAlreadyFound) {
        // Add location to found wally list, in order to display check
        setFoundWalliesCoordinates((current) => [
          ...current,
          centerCoordinates,
        ]);

        setWalliesFound((current) => [...current, wallyName]);

        try {
          await endTrackingGameDuration();

          toast.success('Finished!', { id: 'wallyVerification' });
          setTimeout(() => {
            toast.remove();
            setSubmitNameVisible(true);
            setGameOngoing(false);
          }, 2000);
        } catch (error) {
          toast.error('Unable to end tracking game duration');
        }
      }
    },
    [foundWalliesCoordinates],
  );

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
          handleWallySelection={handleWallySelection}
          clientY={clientY}
        />
      )}
      <FoundWallyOverlay foundWalliesCoordinates={foundWalliesCoordinates} />
      <Toaster />
    </div>
  );
}

Canvas.propTypes = {
  setGameOngoing: PropTypes.func.isRequired,
  setSubmitNameVisible: PropTypes.func.isRequired,
  setWalliesFound: PropTypes.func.isRequired,
};
