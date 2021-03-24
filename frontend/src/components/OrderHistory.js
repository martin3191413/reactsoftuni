import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import UserControlMenu from './UserControlPanel';

const OrderHistory = () => {

    const [ordersData,setOrdersData] = useState([]);

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
                    items: order.items[0],
                    id: order._id,
                    totalMoney: order.totalMoney
                };
               formattedOrders.push(newOrder);
            }
            else{
                let newOrder = {
                    madeAt: order.madeAt,
                    id: order._id,
                    items: {},
                    totalMoney: order.totalMoney
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
        formattedOrders.sort(function(a,b){
            return new Date(a.madeAt) - new Date(b.madeAt);
        });
        setOrdersData(formattedOrders);
    };

    const renderOrderHistory = (ordersData) => {

        let singleItemsOrders = [];
        let multipleItemsOrders = [];

        ordersData.map(order => {
            if (order.items.length !== undefined){
                multipleItemsOrders.push(order);
            }
            else{
                singleItemsOrders.push(order);
            }
        });

       let singleItemsData = singleItemsOrders.map(order => (
        <div className="order-history-singleItem">
        <span className="order-number">
            Order #{order.id}
        </span>
        <div className="order-info">
            <img className="order-img" src={order.items.image} alt="white-tshirt"></img>
            <p className="order-model">{order.items.model}</p>
            <br></br>
            <span className="order-price">Price: {order.items.price.toFixed(2)}$</span>
            <span className="order-subtotal">Total: {order.totalMoney.toFixed(2)}$</span>
        </div>
    </div>
        ));

        const multipleItemsData =  multipleItemsOrders.map(order => {
            const data = order.items.map(item => (
                <div className="one-item-info">
                <img className="order-img-multipleItems" src={item.image} alt="white-tshirt"></img>
                <p className="order-model-multipleItems">{item.model}</p>
                <br></br>
                <span className="order-price-multipleItems">Price: {item.price.toFixed(2)}$</span>
                </div>
            ));

            const row = <div className="order-history-multipleItems">
            <span className="order-number-multipleItems">
                Order #{order.id}
                </span>
            <div className="order-info-multipleItems">
                {data}
            </div>
            <span className="order-subtotal-multipleItems">Total: {order.totalMoney.toFixed(2)}$</span>
            </div>;

            return row;
     });

     let finalData = [];

     finalData.push(singleItemsData, multipleItemsData);

     return finalData;
    };

    const history = renderOrderHistory(ordersData);

    return (
        <>
        <UserControlMenu />
        <div className="history">
            {history}
        </div>
        </>
    );
};

export default OrderHistory;
