import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <a href="#"><img src="https://img.icons8.com/ios-filled/24/ffffff/youtube-play.png" alt="YouTube" /></a>
        <a href="#"><img src="https://img.icons8.com/ios-filled/24/ffffff/rss.png" alt="RSS" /></a>
        <a href="#"><img src="https://img.icons8.com/ios-filled/24/ffffff/delete-sign.png" alt="X" /></a>
        <a href="#"><img src="https://img.icons8.com/ios-filled/24/ffffff/facebook.png" alt="Facebook" /></a>
      </div>

      <div className="footer-links">
        <span>©2025 ScaleHR</span>
        <a href="#">About Us</a>
        <a href="#">Plans</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact Us</a>
      </div>
    </footer>
  );
}

export default Footer;
