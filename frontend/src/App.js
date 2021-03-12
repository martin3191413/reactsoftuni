import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Link, Route,Switch} from 'react-router-dom';
import {useJwt} from 'react-jwt';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import  Login from './components/Login';
import ImageBanner from './components/imageBanner';
import HomePageWomen from './components/homePageWomen';
import WomenImageBanner from './components/womenImageBanner';
import Map from './components/Map';
import ContactInfo from './components/ContactInfo';
import Form from './components/Form';
import Register from './components/Register';
import DetailsPage from './components/DetailsPage';
import MenSection from './components/MenSection';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Cart from './components/Cart';
import axios from 'axios';
import jwt from 'jsonwebtoken';


function App() {

  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchData();
    loggedUser();
  }, []);

  const fetchData = (e) => {
    axios({
      url: "/api/shoes",
      method: "GET"
    })
    .then((response) => {
      setData(response.data);
    });
  };

  const loggedUser = () => {
    const cookie = localStorage.getItem('userId');

    if (!cookie){
      setLoggedIn(false);
    }
    else{
      setLoggedIn(true);
    }
  };

  return (
    <Router>
    <div className="container">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Switch>
      <PublicRoute path="/" exact component={HomePage} loggedIn={loggedIn} restricted={false} data={data} setCartItems={setCartItems} cartItems={cartItems} />
      <PublicRoute path="/login" exact component={Login}  setLoggedIn={setLoggedIn}  loggedIn={loggedIn} restricted={false}/>
      <Route path="/contacts"
       exact
       render={(props) => (
         <ContactInfo {...props} />
       )}
       />
       <PrivateRoute path="/details/:id" exact component={DetailsPage} loggedIn={loggedIn} restricted={true} />
        <Route
       path="/men"
        exact
        render={(props) => (
          <MenSection {...props}  />
        )}
        />
        <Route
       path="/register"
        exact
        render={(props) => (
          <Register {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        )}
        />
        <Route 
        path="/cart"
        exact
        render={(props) => (
          <Cart  {...props} cartItems={cartItems}/>
        )}
        />
    </Switch>
    </div>
    </Router>
  );
}

export default App;
