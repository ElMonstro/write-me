import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../css/App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Login from '../components/Login';

const Routes = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Footer />
    </div>
  </BrowserRouter>
);

export default Routes;
