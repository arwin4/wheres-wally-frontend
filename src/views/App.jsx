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

  if (gameOngoing) {
    return <Canvas />;
  }

  if (!gameOngoing) {
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
}

export default App;
