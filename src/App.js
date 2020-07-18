import React from 'react';
import './App.css';
import NavBar from './components/Navigation/NavBar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import Layout from './containers/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}

export default App;
