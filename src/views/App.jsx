import React, { useState } from 'react';
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

  const [gameOngoing, setGameOngoing] = useState(false);

  // userToken is persistent across reloads
  if (!localStorage.getItem('userToken')) useUserToken();

  if (gameOngoing) {
    return <Canvas />;
  }

  if (!gameOngoing) {
    return (
      <>
        <Start setGameOngoing={setGameOngoing} />
        <div className="credit">
          <a href="https://www.youtube.com/watch?v=BR3kGw_FMOM">
            Image credit.
          </a>
          {'  '} Used with permission.
        </div>
      </>
    );
  }
}

export default App;
