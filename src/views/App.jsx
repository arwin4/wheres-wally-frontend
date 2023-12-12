import React, { useCallback, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import preloadIcons from '../utils/preloadIcons';
import Canvas from '../components/Canvas';

import '../components/styles/App.css';
import useSessionToken from '../hooks/useSessionToken';
import useUserToken from '../hooks/useUserToken';
import Start from '../components/Start';
import preloadSearchImage from '../utils/preloadSearchImage';

function App() {
  preloadIcons();
  preloadSearchImage();
  useSessionToken();
  useUserToken();

  const [gameOngoing, setGameOngoing] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const startGame = useCallback(async () => {
    // Mark all wallies as not found
    try {
      const response = await fetch(`http://localhost:3000/wallies`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userToken: localStorage.getItem('userToken'),
        }),
      });

      if (!response.ok) throw new Error();

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
