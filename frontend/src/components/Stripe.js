import React, {useState, useContext} from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {UserContext} from './UserContext';
import {useHistory} from 'react-router-dom';

import axios from 'axios';

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      fontWeight: 500,
      color: '#fff',
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

  const [processing, setProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const {cartItems, setCartItems} = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
    phone: ""
  });
  
  const history = useHistory();

  const totalPrice = (cartItems) => {

    let totalPrice = 0;

    cartItems.map(item => {
      totalPrice += Number(item.price) * Number(item.qty);
    });

    totalPrice = totalPrice * 0.20 + totalPrice;

    return totalPrice;
  };


  const onClickHandler = async(e)  => {
    setProcessing(true);
    
    e.preventDefault();

    const {error,paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails
    });

    if (!error){

      const payload = {
        id: paymentMethod.id,
        amount: totalPrice(cartItems) * 100
      };


      axios({
        url: '/api/stripe-payment',
        method: 'POST',
        data: payload,
      })
      .then(res => {
        setProcessing(false);
        history.push('/successfull-order');
      });
    }
    else{
      setIsError(true);
      setErrorMessage(error.message);
      setProcessing(false);
    }

  };

  return (
    <>
    <div className="AppWrapper">
      <section className={isError === false ? '' : 'notifications'}>
            <p className="notification-message">{isError === false ? '' : errorMessage}</p>
        </section>
    <form onSubmit={onClickHandler} className="Form">
      <div className="FormGroup">
      <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </div>
      <div className="FormGroup">
        <CardField />
      </div>
      <button type="submit" disabled={!stripe} disabled={isError ? true : false} className="stripe-btn">{processing ? 'Processing...' : `Pay $${totalPrice(cartItems)}`}</button>
    </form>
    </div>
    </>
  );
};

export default Stripe;
