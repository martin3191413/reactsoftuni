import React from 'react';
import {Link} from 'react-router-dom';

const ImageBanner = () => {
    return (
        <div className="imageBanner">
            <Link to="/men"><button className="bannerBtn">Shop Now </button></Link>
        </div>
    );
};

export default ImageBanner;
