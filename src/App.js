
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
function App() {


  return (
    <Router>
      <Navbar />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;
