// src/features/ContactTab.jsx
import React from 'react';
import './ContactTab.css'; // optional: create this if you want specific styling

function ContactTab() {
  return (
    <div className="contact-page-container">
      <div className="contact-card">
        <h1 className="contact-title">🌌 Get in Touch</h1>
        <p className="contact-text"> 
          <strong>If you have any questions, suggestions, or would like access to CubeSat missions data, feel free to contact us.</strong>
        </p>
        <p className="contact-text">
          <strong>We’re happy to collaborate with researchers, developers, and space enthusiasts.</strong>
        </p>
        <div className="contact-info">
          <p><strong>Email:</strong> cubesat@spaceplatform.com</p>
          <p><strong>Phone:</strong> +212 6 00 00 00 00</p>
        </div>
      </div>
    </div>
  );
}

export default ContactTab;
