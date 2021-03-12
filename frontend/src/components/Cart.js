import React from 'react';

const Cart = () => {
    return (
        <table>
            <tr className="table-header">
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            </tr>
            <tr>
                <td>
                    <div className="item-info">
                        <img src="https://media.gq-magazine.co.uk/photos/5f575108020908336ccd4d82/master/w_1000,c_limit/20200907-tshirt-05.jpg" alt="tshirt" className="item-img"></img>
                        <div className="item-details">
                            <p>White Thisrt</p>
                            <span>Price</span>
                            <br></br>
                            <button>Remove</button>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1" className="cart-quantity-item"></input></td>
                <td><span className="price-cart">50.00$</span></td>
            </tr>
            <tr>
                <td>
                    <div className="item-info">
                        <img src="https://media.gq-magazine.co.uk/photos/5f575108020908336ccd4d82/master/w_1000,c_limit/20200907-tshirt-05.jpg" alt="tshirt" className="item-img"></img>
                        <div className="item-details">
                            <p>White Thisrt</p>
                            <span>Price</span>
                            <br></br>
                            <button>Remove</button>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="1" className="cart-quantity-item"></input></td>
                <td><span className="price-cart">50.00$</span></td>
            </tr>
        </table>
    );
};

export default Cart;