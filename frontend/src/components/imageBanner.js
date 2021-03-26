import React from 'react';
import {Link} from 'react-router-dom';

const imageBanner = () => {
    return (
        <div className="imageBanner">
            <Link to="/men"><button>Shop Now </button></Link>
        </div>
    );
};

export default imageBanner;
