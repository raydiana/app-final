
import './App.css';

/*function App() {
  return (
    <div className="App">
      <div className="list">
        <ProductForm />
        <ProductList />
      </div>
    </div>

  );
}*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';


function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/vendre" className="nav-link">Vendre</Link>
          </li>
          <li className="nav-item">
            <Link to="/acheter" className="nav-link">Acheter</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/vendre" element={<ProductForm />} />
        <Route path="/acheter" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;