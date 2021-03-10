import axios from 'axios';
import React from 'react';

const MenSection = () => {

    const fetchData = (e) => {
        axios({
            url: "/api/shoes/men",
            method: "GET"
        })
        .then((response) => {
            console.log(response);
        });
    };

    fetchData();
    return (
        <div>
            
        </div>
    );
}
;
export default MenSection;
