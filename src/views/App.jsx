import React, { useState } from 'react';
import Canvas from '../components/Canvas';

function App() {
  const [clickCoordinates, setClickCoordinates] = useState({ x: 1, y: 1 });
  return (
    <Canvas
      clickCoordinates={clickCoordinates}
      setClickCoordinates={setClickCoordinates}
    />
  );
}

export default App;
