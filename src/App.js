import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { setAuthToken } from './axios'

import Layout from './containers/Layout/Layout';

function App() {
  const [initialized ,setInitialized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      // no token found
      console.log('token NOT FOUND')
    } else {
      setAuthToken(token)
      console.log('token FOUND')
    }

    setInitialized(true)
  }, [])

  return (
    <BrowserRouter>
      { initialized ? <Layout/> : null}
    </BrowserRouter>
  );
}

export default App;
