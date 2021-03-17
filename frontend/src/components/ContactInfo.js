import React from 'react';
import Map from './Map';
import PromoOffer from './PromoOffer';
import Header from './Header';

const ContactInfo = ({loggedIn,setLoggedIn, cartItems, setCartItems}) => {
    return (
        <>
       <Header  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
       <PromoOffer />
       </>
    );
};

export default ContactInfo;
