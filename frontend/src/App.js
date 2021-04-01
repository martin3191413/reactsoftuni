import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import  Login from './components/Login';
import ContactInfo from './components/ContactInfo';
import Register from './components/Register';
import DetailsPage from './components/DetailsPage';
import SecuredPaymentCheckout from './components/SecuredPaymentCheckout';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import MenSection from './components/MenSection';
import WomenSection from './components/WomenSection';
import UserProfile from './components/UserProfile';
import Searched from './components/Searched';
import AccountInfo from './components/AccountInfo';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import UserSettings from './components/UserSettings';
import SuccessfullOrder from './components/SuccessfullOrder';
import {UserContext} from './components/UserContext';
import {SearchContext} from './components/SearchContext';
import {PaymentContext} from './components/PaymentContext';
import Stripe from './components/Stripe';
import axios from 'axios';


function App() {
  
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('userId') ? true : false));
  const [cartItems, setCartItems] = useState(JSON.parse((localStorage.getItem('cartItems'))) || ([]));
  const [menShoes, setMenShoes] = useState([]);
  const [womenShoes, setWomenShoes] = useState([]);
  const [userFavItems, setUserFavItems] = useState(JSON.parse((localStorage.getItem('userFavItems'))) || []);
  const [searchInput, setSearchInput] = useState('');
  const [confirmed, setConfirmed] = useState({
    userOrderEmail: '',
    confirmedOrder: false
  });


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
      <PaymentContext.Provider value={{confirmed, setConfirmed}} >
      <SearchContext.Provider value={{searchInput, setSearchInput}}>
      <UserContext.Provider value={{loggedIn, setLoggedIn, cartItems, setCartItems, userFavItems, setUserFavItems}}>
      <Switch>
      <PublicRoute path="/" exact component={HomePage} restricted={false} data={data} />
      <PublicRoute path="/login" exact component={Login} restricted={false}/>
      <Route 
        path="/men"
        exact
        render={(props) => (
          <MenSection  {...props} data={menShoes}/>
        )}
        />
        <Route 
        path="/women"
        exact
        render={(props) => (
          <WomenSection  {...props} data={womenShoes}/>
        )}
        />
      <Route path="/contacts"
       exact
       render={(props) => (
         <ContactInfo {...props}/>
       )}
       />
       <PrivateRoute path="/details/:id"  exact component={DetailsPage} />
        <Route
       path="/register"
        exact
        render={(props) => (
          <Register {...props}/>
        )}
        />
        <PrivateRoute path="/cart" exact component={Cart}/>
        <Route 
        path="/favourites"
        exact
        render={(props) => (
          <UserProfile {...props}/>
        )}
        />
        <Route
        path="/search"
        exact
        render={(props) => (
          <Searched {...props} data={data}/>
        )} 
        />
        <Route
        path="/profile"
        exact
        render={(props) => (
          <AccountInfo {...props} />
        )} 
        />
        <Route 
        path="/profile/order-history"
        exact
        render={(props) => (
          <OrderHistory {...props}/>
        )}
        />
        <Route 
        path="/profile/settings"
        exact
        render={(props) => (
          <UserSettings {...props}/>
        )}
        />
        <Route 
        path="/payment"
        exact
        render={(props) => (
          <Stripe {...props}/>
        )}
        />
        <SecuredPaymentCheckout component={SuccessfullOrder} />
    </Switch> 
    </UserContext.Provider>
    </SearchContext.Provider>
    </PaymentContext.Provider>
    </div>
    </Router>
  );
}

export default App;
