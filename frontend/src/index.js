import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  type: 'success',
  offset: '20px',
  // you can also just use 'scale'
  transition: 'fade'
};

const stripePromise = loadStripe('pk_test_51IaKmoGtpROy8rrpIpy1ujso4zf4zh5Aw0FVGvzfwACGjtrfPeBX3nFm7eO2btkZwNq1R0wU7aNdHoV7yq7bZhPp00hLpTtmBt');

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <Elements stripe={stripePromise}>
    <App />
    </Elements>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
