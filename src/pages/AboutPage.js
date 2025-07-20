import React from 'react';
import '../assets/css/About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>Discover our story and what makes us unique!</p>
      <div className="about-content">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide travelers with the best hotel booking experience possible. We strive to connect guests with the best accommodations that meet their needs, ensuring every stay is memorable and enjoyable.
        </p>
        
        <h2>Our Values</h2>
        <ul>
          <li>Customer Satisfaction: We prioritize our customers and their needs.</li>
          <li>Integrity: We operate with honesty and transparency.</li>
          <li>Quality: We offer high-quality services and accommodations.</li>
          <li>Innovation: We embrace technology to improve our services.</li>
        </ul>

        <h2>Our Story</h2>
        <p>
          Founded in 2010, our hotel booking platform started with a simple idea: to make hotel booking easy and accessible for everyone. Over the years, we have expanded our services to thousands of hotels worldwide, ensuring that our customers can find the perfect stay wherever they go.
        </p>
        
        <h2>Meet Our Team</h2>
        <p>
          Our dedicated team of travel experts is here to assist you with any inquiries or concerns. We are passionate about travel and committed to providing exceptional service.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;