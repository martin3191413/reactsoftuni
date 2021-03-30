import React from 'react';
import {
  CardElement,
  PaymentRequestButtonElementComponent,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import axios from 'axios';

const Stripe = () => {
  
  const stripe = useStripe();
  const elements = useElements();


  const onClickHandler = async(e)  => {
    
    e.preventDefault();

    const {error,paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details:{
        address: {
          city: 'Sofia',
          country: 'BG'
        }
      }
    });

    if (!error){

      const payload = {
        id: paymentMethod.id,
        amount: 1099
      };
    
      console.log(paymentMethod);

      axios({
        url: '/api/stripe-payment',
        method: 'POST',
        data: payload,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
    else{
      console.log(error);
    }
  };

  return (
    <form onSubmit={onClickHandler}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default Stripe;
