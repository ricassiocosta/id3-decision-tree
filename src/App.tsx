import React from 'react';

import { ID3Tree } from './ID3';
import Tree from 'react-tree-graph';
import { Container, Title } from './styled';

import './App.css'

import 'react-tree-graph/dist/style.css'

function App() {
  const tree = ID3Tree.get();

  return (
    <Container>
      <Title>ID3: Decision Tree</Title>

      <Tree
        data={tree}
        height={1000}
        width={800}
        svgProps={{
          className: 'custom',
          transform: 'rotate(90)'
        }}
      />
    </Container>
  );
}

export default App;
