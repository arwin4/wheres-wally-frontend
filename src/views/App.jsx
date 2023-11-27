import React from 'react';
import preloadIcons from '../utils/preloadIcons';
import Canvas from '../components/Canvas';

import '../components/styles/App.css';

function App() {
  preloadIcons();

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
