import React from 'react';
import preloadIcons from '../utils/preloadIcons';
import Canvas from '../components/Canvas';

import '../components/styles/App.css';
import setSessionToken from '../hooks/setSessionToken';
import setUserToken from '../hooks/setUserToken';

function App() {
  preloadIcons();
  setSessionToken();

  // userToken is persistent across reloads
  if (!localStorage.getItem('userToken')) setUserToken();

  return (
    <>
      <Canvas />
      <div className="credit">
        <a href="https://www.youtube.com/watch?v=BR3kGw_FMOM">Image credit.</a>
        {'  '} Used with permission.
      </div>
    </>
  );
}

export default App;
