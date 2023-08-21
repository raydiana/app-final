import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/vendre">Vendre</Link></li>
        <li><Link to="/acheter">Acheter</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
