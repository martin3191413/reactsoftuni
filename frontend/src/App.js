import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import  Login from './components/Login';
import ContactInfo from './components/ContactInfo';
import Register from './components/Register';
import DetailsPage from './components/DetailsPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import MenSection from './components/MenSection';
import WomenSection from './components/WomenSection';
import Cart from './components/Cart';
import axios from 'axios';


function App() {
  

  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('userId') ? true : false));
  const [cartItems, setCartItems] = useState(JSON.parse((localStorage.getItem('cartItems'))) || ([]));
  const [menShoes, setMenShoes] = useState([]);
  const [womenShoes, setWomenShoes] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);


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
      <PublicRoute path="/" exact component={HomePage} loggedIn={loggedIn} setLoggedIn={setLoggedIn} restricted={false} data={data} setCartItems={setCartItems} cartItems={cartItems} />
      <PublicRoute path="/login" exact component={Login}  setLoggedIn={setLoggedIn}  loggedIn={loggedIn} restricted={false}/>
      <Route 
        path="/men"
        exact
        render={(props) => (
          <MenSection  {...props} cartItems={cartItems} setCartItems={setCartItems} data={menShoes} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        )}
        />
        <Route 
        path="/women"
        exact
        render={(props) => (
          <WomenSection  {...props} cartItems={cartItems} setCartItems={setCartItems} data={womenShoes} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        )}
        />
      <Route path="/contacts"
       exact
       render={(props) => (
         <ContactInfo {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartItems={cartItems} setCartItems={setCartItems} />
       )}
       />
       <PrivateRoute path="/details/:id" exact component={DetailsPage} loggedIn={loggedIn} restricted={true} cartItems={cartItems} setCartItems={setCartItems} />
        <Route
       path="/register"
        exact
        render={(props) => (
          <Register {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        )}
        />
        <PrivateRoute path="/cart" exact component={Cart} loggedIn={loggedIn} setLoggedIn={setLoggedIn} restricted={true} cartItems={cartItems} setCartItems={setCartItems} /> 
    </Switch>
    </div>
    </Router>
  );
}

export default App;
