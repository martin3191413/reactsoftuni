import React, {useState, useEffect} from 'react';
import UserControlMenu from './UserControlPanel';
import LoadingBar from './LoadingBar';
import Header from './Header';
import Footer from './Footer';
import * as fetchDataServices from './services/fetchDataServices';
import * as dataFormatServices from './services/dataFormatServices';
import renderDataHistory from './services/renderDataHistory';

const OrderHistory = () => {

    const [ordersData,setOrdersData] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('userId');

    useEffect(() => {
        fetchDataServices.getAllOrdersByUser(token)
        .then(res => {
           const orders =  dataFormatServices.formatOrderHistoryData(res.data);
           setOrdersData(orders);
           setLoading(false);
        });
    }, []);

    const noOrders = <h2 className="no-orders">You don't have any orders yet</h2>;

    const history = <div className="history">
    <h2 className="header-order">Order History</h2>
    {ordersData.length !== 0 ? renderDataHistory(ordersData) : noOrders}
    </div>;

    return (
        <>
         <Header/>
        <UserControlMenu />
       {loading === true ? <LoadingBar /> : history}
        <Footer />
        </>
    );
};

export default OrderHistory;
