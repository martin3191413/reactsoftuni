import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import  Login from './components/Login';
import ImageBanner from './components/imageBanner';

function App() {
  const [searchInput, setSearchInput] = useState(false);
  return (
    <div className="container">
      <Header searchInput={searchInput} setSearchInput={setSearchInput}/>
      <HomePage/>
      <ImageBanner/>
      <HomePage/>
      <Footer />
    </div>
  );
}

export default App;
