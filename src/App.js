import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Navbar from './Components/Navigation/Navbar';
import Content from './Components/Content/Content';

function App() {
  const [page, setPage] = React.useState(0);

  return (
    <Container fixed>
      <Navbar action={setPage}/>
      <Content context={{pageRef: page}}/>
    </Container>
  );
}

export default App;
