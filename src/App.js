import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { setAuthToken } from './axios'

import Layout from './containers/Layout/Layout';

function App() {
  const [initialized, setInitialized] = useState(false)
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      // no token found
      console.log('token NOT FOUND')
      setLoggedIn(false)
    } else {
      setAuthToken(token)
      setLoggedIn(true)
      console.log('token FOUND')
    }

    setInitialized(true)
  }, [])



  return (
    <BrowserRouter>
      {initialized ? <Layout isLoggedIn={isLoggedIn} /> : null}
    </BrowserRouter>
  );
}

export default App;
