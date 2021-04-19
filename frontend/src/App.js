import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {UserContext} from './components/UserContext';
import {SearchContext} from './components/SearchContext';
import {PaymentContext} from './components/PaymentContext';
import {HomePage,ContactInfo,RegisterContainer,LoginContainer,DetailsPage,SecuredPaymentCheckout,PrivateRoute,PublicRoute,
MenSection,WomenSection,UserFavourites,Searched,AccountInfo,Cart,OrderHistory,UserSettings,SuccessfullOrder,Stripe} from './components/import';
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
    confirmedOrder: false,
    orderId: '',
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
      <Route 
      path="/login"
      exact
      render={(props) => (
        <LoginContainer  {...props}/>
      )}
      />
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
         <RegisterContainer {...props} />
       )}
       />
        <PrivateRoute path="/cart" exact component={Cart}/>
        <PrivateRoute path="/favourites" exact component={UserFavourites} />
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
        <PrivateRoute path="/profile/order-history" exact component={OrderHistory} />
        <PrivateRoute path="/profile/settings" exact component={UserSettings} />
        <PrivateRoute path="/payment" excat component={Stripe} />
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
