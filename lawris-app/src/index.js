import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@popperjs/core'; 
import { Provider } from 'react-redux';
import store from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react'

// import $ from 'jquery';
// import Popper from 'popper.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
      <App />
  </Provider>
   
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
