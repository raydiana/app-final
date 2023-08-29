import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  /*const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };*/

  return (
    <nav className="navbar">
      <div className="logo">E-sport</div>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/Sell">Vendre</Link></li>
        <li><Link to="/Buy">Acheter</Link></li>
        <li class="shopping">Panier</li>
        <li><Link to="/About">A propos</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        <li><Link to="/Login">Login</Link></li>
        <li><Link to="/Register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

