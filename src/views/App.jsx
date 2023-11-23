import React, { useState } from 'react';
import Canvas from '../components/Canvas';

function App() {
  const [clickCoordinates, setClickCoordinates] = useState({});
  return <Canvas setClickCoordinates={setClickCoordinates} />;
}

export default App;
