import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from './UserContext';
import Header from './Header';
import Footer from './Footer';
import jwt from 'jsonwebtoken';
import {PaymentContext} from './PaymentContext';
import CartTable from './CartTable';
import EmptyCartBag from './EmptyCartBag';
import * as fetchDataServices from './services/fetchDataServices';

const Cart = () => {
    
    const history = useHistory();
    
    const {confirmed,setConfirmed} = useContext(PaymentContext);
    const {cartItems} = useContext(UserContext);
    const [isError,setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [classes,setClasses] = useState('');

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const subtotal = (cartItems) => {
        let subtotalPrice = 0;

        cartItems.forEach((item) => {
            subtotalPrice += Number(item.price) * Number(item.qty);
        });
        return subtotalPrice;
    };

    const taxes = (subtotalPrice) => {
        return subtotalPrice * 0.20;
    };

    const total = (subtotalPrice, taxes) =>{
        return subtotalPrice + taxes;
    };

    const buyItems = () => {

        const orderCost = Number(total(subtotal(cartItems),taxes(subtotal(cartItems))).toFixed(2));
        
        const token = localStorage.getItem('userId');

        jwt.verify(token, 'mySecretSecret', function(err,data){
            if (err){
                console.log(err);
            }

            fetchDataServices.getUser(data.id)
            .then(res => {
                if (orderCost > res.data.amountMoney){
                   setClasses('notifications');
                   setIsError(true);
                   setErrorMessage('Insufficient funds!');

                   setTimeout(() => {
                       setIsError(false);
                   }, 3000);
                }
                else{
                    const payload = {
                        money: res.data.amountMoney - orderCost,
                        id: res.data._id,
                        cartItems,
                        orderCost
                    };

                    fetchDataServices.makeOrder(payload)
                    .then(res => {
                        setConfirmed({...confirmed, orderId: res.data.id});
                        history.push('/payment');
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        });
    };

    return (
        <>
        <Header/>
        <section className={isError === false ? "" : classes}>
            <p className="notification-message">{isError === false ? "" : errorMessage}</p>
        </section>
        {cartItems.length === 0 ? <EmptyCartBag /> : <CartTable items={cartItems} /> }
      
        <div className="price-table">
        <table className="final-price">
            <tr>
                <td className="final-price-td">Subtotal:</td>
                <td className="final-price-td-price" >{(subtotal(cartItems).toFixed(2))}$</td>
            </tr>
            <tr>
                <td className="final-price-td">Tax:</td>
                <td className="final-price-td-price">{taxes(subtotal(cartItems)).toFixed(2)}$</td>
            </tr>
            <tr>
                <td className="final-price-td" >Total:</td>
                <td className="final-price-td-price">{total(subtotal(cartItems),taxes(subtotal(cartItems))).toFixed(2)}$</td>
            </tr>
        </table>
        </div>
        <div className="cart-buy">
            <button className={cartItems.length === 0 ? "cart-buy-btn-not-allowed" : "cart-buy-btn"} disabled={cartItems.length === 0 ? true : false}  onClick={() =>buyItems()}>Checkout</button>
        </div>
        <Footer />
        </>
    );
};

export default Cart;