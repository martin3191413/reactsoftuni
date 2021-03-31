import React, {useState} from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import axios from 'axios';

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const CardField = ({}) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS}/>
  </div>
);

const Stripe = () => {
  
  const stripe = useStripe();
  const elements = useElements();

  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
    phone: ""
  });


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
    <div className="AppWrapper">
<form onSubmit={onClickHandler} className="Form">
      <div className="FormGroup">
      <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 555-0123"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </div>
      <div className="FormGroup">
        <CardField />
      </div>
      <button type="submit" disabled={!stripe} className="stripe-btn">Pay $25</button>
    </form>
    </div>
  );
};

export default Stripe;
