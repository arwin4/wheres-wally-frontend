import React from 'react';
import preloadIcons from '../utils/preloadIcons';
import Canvas from '../components/Canvas';

import '../components/styles/App.css';

function App() {
  preloadIcons();

  return <Canvas />;
}

export default App;
