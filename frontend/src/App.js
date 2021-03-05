import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import  Login from './components/Login';
import ImageBanner from './components/imageBanner';
import HomePageWomen from './components/homePageWomen';
import WomenImageBanner from './components/womenImageBanner';
import Map from './components/Map';
import ContactInfo from './components/ContactInfo';

function App() {
  return (
    <div className="container">
      <Header />
      <ContactInfo/>
      <Map />
      <Footer />
    </div>
  );
}

export default App;
