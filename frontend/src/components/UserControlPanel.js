import React from 'react';
import {NavLink} from 'react-router-dom';

const UserControlPanel = () => {
    return (
        <div className="control-menu">
            <NavLink exact to="/profile/order-history" className="control-panel" activeClassName="active-control"><i className="fas fa-cubes profile-icon"></i>Order History</NavLink>
            <NavLink  exact to="/profile" className="control-panel"activeClassName="active-control" ><i className="fas fa-user profile-icon"></i>Account Information</NavLink>
            <NavLink exact to="/profile/settings"className="control-panel" activeClassName="active-control"><i className="fas fa-cog profile-icon"></i>Settings</NavLink>
        </div>
    );
};

export default UserControlPanel;
