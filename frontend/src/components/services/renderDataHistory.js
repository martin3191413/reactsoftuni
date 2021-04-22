import moment from 'moment';

const renderDataHistory = (data) => {

        let items = [];

        data.map(order => {
            if (order.items.length !== undefined){
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
                    <br></br>
                   {moment(order.madeAt).format('MMMM Do YYYY, h:mm a')}
                    </span>
                <div className="order-info-multipleItems">
                    {data}
                </div>
                <span className="order-subtotal-multipleItems">Total: {order.totalMoney.toFixed(2)}$</span>
                <span className={order.status === 'Completed' ? 'status green' : 'status red'}>Status: {order.status}</span>
                </div>;
    
                items.push(row);
            }
            else{
               const row = <div className="order-history-singleItem">
                     <span className="order-number">
                    Order #{order.id}
                    <br></br>
                    {moment(order.madeAt).format('MMMM Do YYYY, h:mm a')}
                     </span>
                  <div className="order-info">
                  <img className="order-img" src={order.items.image} alt="white-tshirt"></img>
                  <p className="order-model">{order.items.model}</p>
                   <br></br>
                   <span className="order-price">Price: {order.items.price.toFixed(2)}$</span>
                     <span className="order-subtotal">Total: {order.totalMoney.toFixed(2)}$</span>
                    <span className={order.status === 'Completed' ? 'status green' : 'status red'}>Status: {order.status}</span>
                   </div>
                     </div>;

                     items.push(row);
            }
        });

        return items;
};

export default renderDataHistory;