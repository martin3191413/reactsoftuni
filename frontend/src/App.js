import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Link, Route,Switch} from 'react-router-dom';
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
import axios from 'axios';


function App() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (e) => {
    setIsLoading(true);
    axios({
      url: "/api/shoes",
      method: "GET"
    })
    .then((response) => {
      setData(response.data);
      setTimeout(() => {
        setIsLoading(false);
      },1000);
    });
  };

  return (
    <Router>
    <div className="container">
      <Header />
      <Switch>
      <Route path="/" exact
      render={(props) => (
        <HomePage {...props} data={data} isLoading={isLoading} />
      )}
      />
      <Route path="/login" exact component={Login} />
      <Route path="/contacts" exact component={ContactInfo} />
      <Route path="/details" exact component={DetailsPage} />
    </Switch>
    </div>
    </Router>
  );
}

export default App;
