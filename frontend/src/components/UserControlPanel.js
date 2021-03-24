import React from 'react';
import {Link} from 'react-router-dom';

const UserControlPanel = () => {
    return (
        <div className="control-menu">
            <Link to="/profile/order-history" className="control-panel">Order History</Link>
            <Link to="/profile"className="control-panel" >Account Information</Link>
            <Link to="/profile/order-history"className="control-panel" >Settings</Link>
        </div>
    );
};

export default UserControlPanel;
