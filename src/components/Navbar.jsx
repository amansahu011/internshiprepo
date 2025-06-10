// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo + Text */}
        <div className="logo-section">
          <img src="https://i.ibb.co/gmFd2pt/logo.png" alt="ScaleHR" className="logo" />
          <div>
            <div className="logo-text">ScaleHR</div>
            <div className="tagline">Simplify. Scale. Succeed.</div>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Partners</a>
          <a href="#">Customers</a>
          <a href="#">Testimonials</a>
          <a href="#">Pricing</a>
        </div>

        {/* CTA Button */}
        <div>
          <button className="cta-button">Book Free Demo</button>
        </div>
      </div>

      {/* Heading Text */}
      <div className="heading-text">
        <h1>An AI-powered plan for every business</h1>
      </div>
    </nav>
  );
};

export default Navbar;
