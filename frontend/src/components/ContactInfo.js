import React from 'react';
import Map from './Map';
import PromoOffer from './PromoOffer';
import Header from './Header';

const ContactInfo = ({loggedIn,setLoggedIn, cartItems, setCartItems, setSearchInput}) => {
    return (
        <>
       <Header setSearchInput={setSearchInput} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
       <div className="order-history-singleItem">
           <span className="order-number">Order #12356757</span>
           <div className="order-info">
               <img className="order-img" src="https://i.pinimg.com/originals/2f/bb/66/2fbb6650a2b6b07aee93909b1f248e24.png" alt="white-tshirt"></img>
               <p className="order-model">Tommy Hilfiger</p>
               <br></br>
               <span className="order-price">Price: 120.00$</span>
           </div>
           <span className="order-subtotal">Subtotal: 120.00$</span>
           <span className="order-status">Status: Completed</span>
       </div>
       <div className="order-history-multipleItems">
           <span className="order-number-multipleItems">Order #12356757</span>
           <div className="order-info-multipleItems">
               <div className="one-item-info">
               <img className="order-img-multipleItems" src="https://i.pinimg.com/originals/2f/bb/66/2fbb6650a2b6b07aee93909b1f248e24.png" alt="white-tshirt"></img>
               <p className="order-model-multipleItems">Tommy Hilfiger</p>
               <br></br>
               <span className="order-price-multipleItems">Price: 120.00$</span>
               </div>
               <div className="one-item-info">
               <img className="order-img-multipleItems" src="https://i.pinimg.com/originals/2f/bb/66/2fbb6650a2b6b07aee93909b1f248e24.png" alt="white-tshirt"></img>
               <p className="order-model-multipleItems">Tommy Hilfiger</p>
               <br></br>
               <span className="order-price-multipleItems">Price: 120.00$</span>
               </div>
           </div>
           <span className="order-subtotal-multipleItems">Subtotal: 120.00$</span>
           <span className="order-status-multipleItems">Status: Completed</span>
       </div>
       </>
    );
};
export default ContactInfo;
