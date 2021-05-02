import React from 'react';
import { ID3Tree } from './ID3';

function App() {
  const tree = JSON.stringify(ID3Tree.print())

  return (
    <>
    <h1>Hello World</h1>
    <p>{tree}</p>
    </>
  );
}

export default App;
