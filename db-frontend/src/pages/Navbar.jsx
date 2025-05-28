import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
      <div className="navbar">
        <header className="header">
          <img src="logo.jpg" alt="The Book Haven" className="header-logo" />
        </header>
        <div className="nav-buttons">
          <button className="nav-button"><Link to="/" className="link">Home</Link></button>
          <button className="nav-button"><Link to="/AllCollection" className="link">Collection</Link></button>
          {isLoggedIn && <button className="nav-button"><Link to="/Add" className="link">Add</Link></button>}
          <button className="nav-button"><Link to="/About" className="link">About</Link></button>
          {isLoggedIn ? (
            <button className="nav-button logout-button" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="nav-button"><Link to="/Login" className="link">Login</Link></button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
