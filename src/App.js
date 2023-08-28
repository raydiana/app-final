import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar  from './components/Navbar';
import Accueil from './pages/Accueil/Accueil';
import Footer from './components/Footer';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Sell from './pages/Sell/Sell';
import Buy from './pages/Buy/Buy';
import Login from './pages/Login/Login';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import Register from './pages/Register/Register';


const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Accueil/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/Sell" element={<Sell/>} />
        <Route path="/Buy" element={<Buy/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/ShoppingCart" element={<ShoppingCart/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;