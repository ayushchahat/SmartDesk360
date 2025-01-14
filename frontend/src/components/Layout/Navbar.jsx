import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">SmartDesk-360</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/billing">Billing</Link></li>
        <li><Link to="/returns">Returns</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
