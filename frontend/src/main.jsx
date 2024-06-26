import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.headers.common['Accept']  = "application/json";
axios.defaults.baseURL = "http://localhost:8000/a1";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
