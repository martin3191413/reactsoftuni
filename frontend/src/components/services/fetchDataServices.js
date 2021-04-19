import axios from 'axios';
 
export const FetchData = (url,method) => {

  return  axios({
        url: url,
        method: method
    });
};