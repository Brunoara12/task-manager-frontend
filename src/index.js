import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

axios.defaults.baseURL = 'https://rebaza-task-manager.herokuapp.com'
//axios.defaults.headers.common = {'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZiN2M4ZmZlODQzYzAwMTdlMGNiNzUiLCJpYXQiOjE1OTUwNDQ0NjB9.VyhICeezjo7mZxFx1Poq572fBjRqWUjVES5K6JELEGw`}
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(request => {
    console.log(request)
    return request
}, error => {
    console.log(error)
    return Promise.reject(error)
})

var myInterceptor = axios.interceptors.response.use(response => {
    console.log(response)
    return response
}, error => {
    console.log(error)
    return Promise.reject(error)
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
