import React from 'react';
import Footer from './Footer';

const Cart = ({cartItems}) => {

    const items = cartItems.map((item) => (
        <tr>
                <td>
                    <div className="item-info">
                        <img src={item.image} alt="tshirt" className="item-img"></img>
                        <div className="item-details">
                            <p>{item.model}</p>
                            <span>Price:  {item.price.toFixed(2)}$</span>
                            <br></br>
                            <button className="cart-btn">Remove</button>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1" className="cart-quantity-item"></input></td>
                <td><span className="price-cart">{item.price.toFixed(2)}$</span></td>
            </tr>
    ));

    return (
        <>
        <table className="cart-table">
            <tr className="table-header">
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            </tr>
            {items}
        </table>
        <div className="price-table">
        <table className="final-price">
            <tr>
                <td className="final-price-td">Subtotal:</td>
                <td className="final-price-td-price" >100.00$</td>
            </tr>
            <tr>
                <td className="final-price-td">Tax:</td>
                <td className="final-price-td-price">35.00$</td>
            </tr>
            <tr>
                <td className="final-price-td" >Total:</td>
                <td className="final-price-td-price" >135.00$</td>
            </tr>
        </table>
        </div>
        <div className="cart-buy">
            <button className="cart-buy-btn">Buy</button>
        </div>
        <Footer />
        </>
    );
};

export default Cart;