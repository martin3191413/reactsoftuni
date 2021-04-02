import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from './UserContext';
import Header from './Header';
import Footer from './Footer';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const Cart = () => {
    
    const history = useHistory();

    const {cartItems, setCartItems} = useContext(UserContext);
    const [isError,setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [classes,setClasses] = useState('');

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const removeClickHandler = (id) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        const filteredCartItems = cartItems.filter(item => item._id !== id);
        setCartItems(filteredCartItems);
        localStorage.setItem('cartItems', JSON.stringify(filteredCartItems));
    };

    const onChangeHandler = (e, item) => {
        if (e.target.value > item.qty){
            let oldCartItems = [...cartItems];
            oldCartItems = oldCartItems.filter((x) => x._id !== item._id);
            const editedItem = {...item, qty: item.qty + 1};
            setCartItems([...oldCartItems, editedItem]);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
        else{
            if (item.qty === 1){
                return;
            }
            let oldCartItems = [...cartItems];
            oldCartItems = oldCartItems.filter((x) => x._id !== item._id);
            const editedItem = {...item, qty: item.qty - 1};
            setCartItems([...oldCartItems, editedItem]);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

    };


    const items = cartItems.map((item) => (
        <tr className="item-row" key={item._id}>
                <td>
                    <div className="item-info">
                        <img src={item.image} alt="tshirt" className="item-img"></img>
                        <div className="item-details">
                            <p>{item.model}</p>
                            <span>Price:  {item.price.toFixed(2)}$</span>
                            <br></br>
                            <button className="cart-btn" onClick={ () => removeClickHandler(item._id)}>Remove</button>
                        </div>
                    </div>
                </td>
                <td><input type="number" className="cart-quantity-item" onChange={(e) => onChangeHandler(e, item)}  value={item.qty}></input></td>
                <td><span className="price-cart">{item.price.toFixed(2)}$</span></td>
            </tr>
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