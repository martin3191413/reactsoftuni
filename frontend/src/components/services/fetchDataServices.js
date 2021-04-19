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

export const getUser = (id) => {

  return axios({
    url: `/api/user/${id}`,
    method: 'GET'
  });
};

export const makeOrder = (payload) => {
 
  return axios({
    method: 'POST',
    url: '/api/user/update',
    data: payload
});
};