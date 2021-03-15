import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import  Login from './components/Login';
import ImageBanner from './components/imageBanner';
import HomePageWomen from './components/homePageWomen';
import WomenImageBanner from './components/womenImageBanner';
import Map from './components/Map';
import ContactInfo from './components/ContactInfo';
import Register from './components/Register';
import DetailsPage from './components/DetailsPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import MenSection from './components/MenSection';
import Cart from './components/Cart';
import axios from 'axios';


function App() {
  

  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(JSON.parse((localStorage.getItem('cartItems'))) || ([]));
  const [menShoes, setMenShoes] = useState([]);
  const [womenShoes, setWomenShoes] = useState([]);


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
      setMenShoes(response.data.filter(item => item.category == "Men"));
      setWomenShoes(response.data.filter(item => item.category == "Women"));
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
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCartItems={setCartItems} cartItems={cartItems}/>
      <Switch>
      <PublicRoute path="/" exact component={HomePage} loggedIn={loggedIn} restricted={false} data={data} setCartItems={setCartItems} cartItems={cartItems} />
      <PublicRoute path="/login" exact component={Login}  setLoggedIn={setLoggedIn}  loggedIn={loggedIn} restricted={false}/>
      <PublicRoute path="/men" exact component={MenSection} restricted={false} cartItems={cartItems} setCartItems={setCartItems} data={menShoes} />
      <Route path="/contacts"
       exact
       render={(props) => (
         <ContactInfo {...props} />
       )}
       />
       <PrivateRoute path="/details/:id" exact component={DetailsPage} loggedIn={loggedIn} restricted={true} />
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
          <Cart  {...props} cartItems={cartItems} setCartItems={setCartItems}/>
        )}
        />
    </Switch>
    </div>
    </Router>
  );
}

export default App;
