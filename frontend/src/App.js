import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import  Login from './components/Login';
import ContactInfo from './components/ContactInfo';
import Register from './components/Register';
import DetailsPage from './components/DetailsPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import MenSection from './components/MenSection';
import WomenSection from './components/WomenSection';
import UserProfile from './components/UserProfile';
import Searched from './components/Searched';
import AccountInfo from './components/AccountInfo';
import Cart from './components/Cart';
import jwt from 'jsonwebtoken';
import axios from 'axios';


function App() {
  

  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('userId') ? true : false));
  const [accountInfo, setAccountInfo] = useState('');
  const [cartItems, setCartItems] = useState(JSON.parse((localStorage.getItem('cartItems'))) || ([]));
  const [menShoes, setMenShoes] = useState([]);
  const [womenShoes, setWomenShoes] = useState([]);
  const [userFavItems, setUserFavItems] = useState(JSON.parse(localStorage.getItem('userFavItems')) || []);
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const setAccountInfoData = () => {

    const token = localStorage.getItem('userId');
    if (token){
      jwt.verify(token, 'mySecretSecret', function(err,data){
        if (err){
            console.log(err);
        }
        axios({
            method: 'GET',
            url: `/api/user/${data.id}`
        })
        .then(res => setAccountInfo(res.data));
    });
    }
  };

  setAccountInfoData();

  const fetchData = (e) => {
    axios({
      url: "/api/shoes",
      method: "GET"
    })
    .then((response) => {
      setData(response.data);
      setMenShoes(response.data.filter(item => item.category === "Men"));
      setWomenShoes(response.data.filter(item => item.category === "Women"));
    });
  };
  

  return (
    <Router>
    <div className="container">
      <Switch>
      <PublicRoute path="/" exact component={HomePage} loggedIn={loggedIn} setLoggedIn={setLoggedIn} restricted={false} data={data} setCartItems={setCartItems} cartItems={cartItems} setSearchInput={setSearchInput} />
      <PublicRoute path="/login" exact component={Login}  setLoggedIn={setLoggedIn}  loggedIn={loggedIn} restricted={false}/>
      <Route 
        path="/men"
        exact
        render={(props) => (
          <MenSection  {...props} setSearchInput={setSearchInput} cartItems={cartItems} setCartItems={setCartItems} data={menShoes} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        )}
        />
        <Route 
        path="/women"
        exact
        render={(props) => (
          <WomenSection  {...props} setSearchInput={setSearchInput} cartItems={cartItems} setCartItems={setCartItems} data={womenShoes} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        )}
        />
      <Route path="/contacts"
       exact
       render={(props) => (
         <ContactInfo {...props} setSearchInput={setSearchInput}  loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartItems={cartItems} setCartItems={setCartItems} />
       )}
       />
       <PrivateRoute path="/details/:id"  exact component={DetailsPage}setSearchInput={setSearchInput}  loggedIn={loggedIn} userFavItems={userFavItems} setUserFavItems={setUserFavItems} setLoggedIn={setLoggedIn} restricted={true} cartItems={cartItems} setCartItems={setCartItems} />
        <Route
       path="/register"
        exact
        render={(props) => (
          <Register {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        )}
        />
        <PrivateRoute path="/cart" exact component={Cart} accountInfo={accountInfo} setAccountInfo={setAccountInfo} setSearchInput={setSearchInput} loggedIn={loggedIn} setLoggedIn={setLoggedIn} restricted={true} cartItems={cartItems} setCartItems={setCartItems} />
        <Route 
        path="/profile"
        exact
        render={(props) => (
          <UserProfile {...props} loggedIn={loggedIn}setSearchInput={setSearchInput}  setLoggedIn={setLoggedIn} cartItems={cartItems} setCartItems={setCartItems} userFavItems={userFavItems} setUserFavItems={setUserFavItems}/>
        )}
        />
        <Route
        path="/search"
        exact
        render={(props) => (
          <Searched {...props} searchInput={searchInput} setSearchInput={setSearchInput} data={data} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartItems={cartItems} setCartItems={setCartItems} />
        )} 
        />
        <Route
        path="/info"
        render={(props) => (
          <AccountInfo {...props} accountInfo={accountInfo} searchInput={searchInput} setSearchInput={setSearchInput} data={data} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartItems={cartItems} setCartItems={setCartItems}  />
        )} 
        />
    </Switch>
    </div>
    </Router>
  );
}

export default App;
