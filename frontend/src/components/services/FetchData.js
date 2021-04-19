import axios from 'axios';
import {useState} from 'react';
 
export default function FetchData(url,method){

    const [data,setData] = useState(null);

    axios({
        url: url,
        method: method
    })
    .then(res => {
        setData(res.data);
    });

    return {data};
};