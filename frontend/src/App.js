import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  const [searchInput, setSearchInput] = useState(false);
  return (
    <div className="container">
      <Header searchInput={searchInput} setSearchInput={setSearchInput}/>
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
