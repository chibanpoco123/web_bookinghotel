import React from 'react';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            © 2024 Booking.com. All rights reserved. We make it easy to book your
            next stay.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/roomlist">Room List</a></li>
            <li><a href="/booking">Booking</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Email: info@booking.com</p>
          <p>Address: 123 Main St, Anytown USA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
