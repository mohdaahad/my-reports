
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {


  return (
    <Provider store={store}>
    <Router basename="/my-reports">
      <Navbar />
      <Routes />
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
