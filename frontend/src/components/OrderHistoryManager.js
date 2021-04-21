import React from 'react';

const OrderHistoryManager = ({data}) => {

    const formatData = (data) => {
        let formattedOrders = [];
        data.map(order => {
            if (order.items.length == 1){
                const newOrder = {
                    madeAt: order.madeAt,
                    items: order.items[0],
                    id: order._id,
                    totalMoney: order.totalMoney,
                    status: order.status
                };
               formattedOrders.push(newOrder);
            }
            else{
                let newOrder = {
                    madeAt: order.madeAt,
                    id: order._id,
                    items: {},
                    totalMoney: order.totalMoney,
                    status: order.status
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
        setLoading(false);
    };
    
    return (
        <div>
            
        </div>
    );
};

export default OrderHistoryManager;
