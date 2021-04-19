import React from 'react';
import {Link} from 'react-router-dom';

const WomenImageBanner = () => {
    return (
        <div className="womenImageBanner">
            <Link to="/women"><button className="bannerBtn">Shop Now </button></Link>
        </div>
    );
};

export default WomenImageBanner;