import axios from 'axios';
import jwt from 'jsonwebtoken';
 
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

export const getAllOrdersByUser = (userToken) => {

 return jwt.verify(userToken, 'mySecretSecret', function(err,data){
    if (err){
        console.log(err);
    }

    return axios({
      method: 'GET',
      url: `/api/orders/${data.id}`
      });
});
};
