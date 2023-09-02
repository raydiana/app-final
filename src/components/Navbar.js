//import React, { useState } from 'react';
import { useContext, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../MyContext';

const Navbar = () => {
  const { username, isAuthenticated, setAuthentication } = useTheme();

  const handleClick = () => {
    alert("Déconnexion réussie!")
    setAuthentication(false)
  }

  return (
    <nav className="navbar">
      <div className="logo">Webstore</div>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/Sell">Vendre</Link></li>
        <li><Link to="/Buy">Acheter</Link></li>
        <li class="shopping">Panier</li>
        <li><Link to="/About">A propos</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        {isAuthenticated ? (<li class="logout" onClick={handleClick}>Logout</li>): (<li><Link to="/Register">Register</Link></li>)}
        {isAuthenticated ? (<li class="shopping">{username}</li>): (<li><Link to="/Login">Login</Link></li>)}
      </ul>
    </nav>
  );
};

export default Navbar;

