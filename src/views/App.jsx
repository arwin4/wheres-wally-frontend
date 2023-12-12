import React, { useCallback, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import preloadIcons from '../utils/preloadIcons';

// Components
import Canvas from '../components/Canvas';
import Start from '../components/Start';

// Hooks
import useSessionToken from '../hooks/useSessionToken';
import useUserToken from '../hooks/useUserToken';

// Utils
import markWalliesAsNotFound from '../utils/markWalliesAsNotFound';
import preloadSearchImage from '../utils/preloadSearchImage';
import startTrackingGameDuration from '../utils/startTrackingGameDuration';

// Style
import '../components/styles/App.css';

function App() {
  preloadIcons();
  preloadSearchImage();
  useSessionToken();
  useUserToken();

  const [gameOngoing, setGameOngoing] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const startGame = useCallback(async () => {
    try {
      await Promise.all([markWalliesAsNotFound(), startTrackingGameDuration()]);
      setGameOngoing(true);
    } catch (error) {
      toast.error('Unable to start game.');
    }
  }, []);

  if (gameOngoing && !gameFinished) {
    return (
      <Canvas
        setGameOngoing={setGameOngoing}
        setGameFinished={setGameFinished}
      />
    );
  }

  if (!gameOngoing && !gameFinished) {
    return (
      <>
        <Start startGame={startGame} />
        <div className="credit">
          <a href="https://www.youtube.com/watch?v=BR3kGw_FMOM">
            Image credit.
          </a>
          {'  '} Used with permission.
        </div>
        <Toaster />
      </>
    );
  }

  if (!gameOngoing && gameFinished) {
    return (
      <>
        <h1>Finished!</h1>
        <button
          type="button"
          onClick={() => {
            setGameOngoing(false);
            setGameFinished(false);
          }}
        >
          To home
        </button>
      </>
    );
  }
}

export default App;
