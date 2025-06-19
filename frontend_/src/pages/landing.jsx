 
import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import image3 from './image3.jpg';

function LandingPage() {
  const router = useNavigate();

  return (
    <div className="landing-page">
      <nav>
        <div className="nav-logo">
          <h1>Connectify</h1>
        </div>
        <div className="nav-links">
          <p className="nav-item" onClick={() => router('/aljk23')}>
            Join as Guest
          </p>
          <p className="nav-item" onClick={() => router('/auth')}>
            Register
          </p>
          <div className="nav-item nav-login" onClick={() => router('/auth')}>
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="content-text">
          <h2><span>Connect</span> with Ease</h2>
          <p>Bridge distances effortlessly with seamless Connectify video conferencing.</p>
          <div className="cta-button">
            <Link to="/auth">Get Started</Link>
          </div>
        </div>
        <div className="content-image">
          {/* <img
            src="image3.jpg"
            // alt="Connectify Hero"
          /> */}
         <img src={image3} alt="Connectify Hero" />


        </div>
      </div>
    </div>
  );
}

export default LandingPage;
