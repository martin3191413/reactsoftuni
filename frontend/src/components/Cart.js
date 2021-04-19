import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from './UserContext';
import Header from './Header';
import CartItem from './CartItem';
import Footer from './Footer';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import {PaymentContext} from './PaymentContext';

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

    const items = cartItems.map((item) => (
        <CartItem item={item} key={item._id} />
    ));

    const subtotal = (cartItems) => {
        let subtotalPrice = 0;

        cartItems.forEach((item) => {
            subtotalPrice += Number(item.price) * Number(item.qty);
        });
        return subtotalPrice;
    };

    const taxes = (subtotalPrice) => {

        const taxes = subtotalPrice * 0.20;

        return taxes;
    };

    const total = (subtotalPrice, taxes) =>{
        const total = subtotalPrice + taxes;
        return total;
    };

    const buyItems = () => {

        const totalMoney = Number(total(subtotal(cartItems),taxes(subtotal(cartItems))).toFixed(2));
        
        const token = localStorage.getItem('userId');

        jwt.verify(token, 'mySecretSecret', function(err,data){
            if (err){
                console.log(err);
            }
            axios({
                method: 'GET',
                url: `/api/user/${data.id}`
            })
            .then(res => {
                if (totalMoney > res.data.amountMoney){
                   setClasses('notifications');
                   setIsError(true);
                   setErrorMessage('Insufficient funds!');

                   setTimeout(() => {
                       setIsError(false);
                   }, 3000);
                }
                else{

                    const money = res.data.amountMoney - totalMoney;

                    const payload = {
                        money,
                        id: res.data._id,
                        cartItems,
                        totalMoney
                    };

                    axios({
                        method: 'POST',
                        url: '/api/user/update',
                        data: payload
                    })
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

    const message = <div className="empty-bag">
        <h3>Bag</h3>
        <h3>There are no items in your bag.</h3>
    </div>;

    const cart =  <table className="cart-table">
    <tr className="table-header">
    <th>Product</th>
    <th>Quantity</th>
    <th>Subtotal</th>
    </tr>
    {items}
    </table>;

    return (
        <>
        <Header/>
        <section className={isError === false ? "" : classes}>
            <p className="notification-message">{isError === false ? "" : errorMessage}</p>
        </section>
        {cartItems.length === 0 ? message : cart }
      
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