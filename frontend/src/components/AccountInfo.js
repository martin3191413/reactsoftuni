import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const AccountInfo = ({loggedIn, setLoggedIn, cartItems, setCartItems, setSearchInput}) => {

    const [accountInfo, setAccountInfo] = useState('');
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = () => {
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
                setAccountInfo(res.data);
                axios({
                    method: 'POST',
                    url: `/api/orders/${data.id}`
                })
                .then(data => {
                    formatData(data.data);
                } )
                .catch(err => console.log(err));

            })
            .catch(err => console.log(err));
        });

    };

    const formatData = (data) => {
        let formattedOrders = [];
        data.map(order => {
            if (order.items.length == 1){
                const newOrder = {
                    madeAt: order.madeAt,
                    items: order.items[0]
                };
               formattedOrders.push(newOrder);
            }
            else{
                let newOrder = {
                    madeAt: order.madeAt,
                    items: {}
                };
                const itemsArr = [];
                order.items.map(item => {
                   const items = Object.assign({}, item);
                   itemsArr.push(items);
                });
                newOrder.items = itemsArr;
                formattedOrders.push(newOrder);
            }
        });
        setOrdersData(formattedOrders);
    };

  
    function getMultipleItemsOrders(ordersData){
        const multipleItems = [];

        ordersData.map(order => {
            if (order.items.length !== undefined){
                multipleItems.push(order);
            }
        });

         const wholeInfo =  multipleItems.map(order => {
               const data = order.items.map(item => (
                <tr className="item-row" key={item._id}>
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
                  <td><input type="number" className="cart-quantity-item"></input></td>
                  <td><span className="price-cart">{item.price.toFixed(2)}$</span></td>
                   </tr>
               ));

               return data;
        });

        return wholeInfo;
    }

    function getSingleItemsOrders(ordersData){
        let singleItems = [];
        
        ordersData.map(order => {
            if (order.items.length === undefined){
                singleItems.push(order);
            }
        });

        let data;

        data = singleItems.map(order => (
            <tr className="order-history-item" key={order.items._id}>
                      <td>
                          <div className="item-info">
                           <img src={order.items.image} alt="tshirt" className="item-img"></img>
                            <div className="item-details">
                            <p>{order.items.model}</p>
                             <br></br>
                             </div>
                            </div>
                        </td>
                        <td><span className="price-cart">{order.items.price.toFixed(2)}$</span></td>
                         </tr>
        ));

        return data;
    }

    const data = getMultipleItemsOrders(ordersData);
    const data2 = getSingleItemsOrders(ordersData);


    return (
        <>
        <Header setSearchInput={setSearchInput}  loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
        <div className="account">
            <i className="far fa-user-circle"></i>
            <h2>Account Info</h2>
            <span className="member">mySite Member Since {moment(accountInfo.joinedAt).format('Do MMMM YYYY')}</span>
            <label htmlFor="email">Email</label>
            <input className="input-field profile" name="email" value={accountInfo.username} disabled></input>
            <label htmlFor="email">Balance</label>
            <input className="input-field profile-amount" value={`${accountInfo.amountMoney} $`} disabled></input>
            <table className="cart-table">
            <tr className="table-header">
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            </tr>
            {data2}
           </table>
             </div>
        <Footer />
        </>
    );
};

export default AccountInfo;
