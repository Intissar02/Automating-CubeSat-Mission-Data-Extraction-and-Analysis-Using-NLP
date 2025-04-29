import React from 'react';
import './About.css';  // Make sure this import is added!

function About() {
  return (
    <div className="about-container">
      <h1>About CubeSat Dashboard</h1>
      <p className="intro">
      Welcome to the CubeSat Dashboard you can explore accessible, and insightful CubeSat mission data.
      </p>

      <section>
        <h2>🌍 Project Overview</h2>
        <p>
          The CubeSat Dashboard is designed to simplify the exploration and analysis of CubeSat mission data.
          Whether you are a researcher, engineer, or space enthusiast, this platform helps you
          access essential mission information in one convenient place.
        </p>
      </section>

      <section>
        <h2>🎯 Project Goal</h2>
        <p>
          To provide a centralized, user-friendly platform where CubeSat mission data is structured,
          searchable, and ready for research or educational use.
        </p>
      </section>

      <section>
        <h2>👥 Target Audience</h2>
        <ul>
          <li>Researchers exploring space missions and satellite technologies.</li>
          <li>Astronomy enthusiasts curious about CubeSat trends and designs.</li>
          <li>Students and professionals seeking real-world mission datasets.</li>
        </ul>
      </section>

      <section>
        <h2>✨ Key Features</h2>
        <ul>
          <li>Detailed mission descriptions with easy navigation.</li>
          <li>Technology breakdowns of CubeSat components and configurations.</li>
          <li>Filtering for data discovery.</li>
        </ul>
      </section>

      <p className="thank-you">
        Thank you for visiting the CubeSat Dashboard. We hope it inspires your journey into space data exploration! 🚀
      </p>
    </div>
  );
}

export default About;
