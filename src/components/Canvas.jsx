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

export default function Canvas({ setGameOngoing, setSubmitNameVisible }) {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 1, y: 1 });
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [foundWalliesCoordinates, setFoundWalliesCoordinates] = useState([]);

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
    image.addEventListener('click', (e) => {
      // Prevent selector from showing on the end of a drag
      if (wasDragged) return;

      // Source for calculation: https://stackoverflow.com/a/42111623/22857578
      const rect = image.getBoundingClientRect();
      setClickCoordinates({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
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
      const { wallyValid, centerCoordinates, gameFinished } = body;

      if (!wallyValid) {
        toast.error(
          `That's not a 'wally'! Or you did not identify it correctly.`,
          { duration: 3000, id: 'wallyVerification' },
        );
      }

      if (wallyValid && !gameFinished) {
        // Add location to found wally list, in order to display check
        setFoundWalliesCoordinates((current) => [
          ...current,
          centerCoordinates,
        ]);

        // This assumes there are 3 wallies to be found.
        toast.success(
          `Nice! ${2 - foundWalliesCoordinates.length} more to go!`,
          {
            duration: 3000,
            id: 'wallyVerification',
          },
        );
      }

      if (gameFinished) {
        // Add location to found wally list, in order to display check
        setFoundWalliesCoordinates((current) => [
          ...current,
          centerCoordinates,
        ]);

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
};
