import { useState } from 'react';
import {  Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
   

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <a href="/" className="logo">
              Logo
            </a>

            {/* Desktop Navigation Links */}
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-button" onClick={toggleMenu}>
              <span className={`rotate-icon ${isOpen ? 'open' : ''}`}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
            <div className="mobile-menu-items">
              <Link to="/" className="mobile-link">Home</Link>
              <Link to="/about" className="mobile-link">About</Link>
              <Link to="/contact" className="mobile-link">Contact</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;