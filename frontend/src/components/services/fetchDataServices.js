import axios from 'axios';
 
export const FetchData = (url,method) => {

  return  axios({
        url: url,
        method: method
    });
};

export const FetchDataOneItem = (id) => {

  return axios({
    url: `/api/shoes/${id}`,
    method: 'GET'
  });
};