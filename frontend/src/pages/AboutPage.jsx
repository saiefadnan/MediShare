import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutPage.css'

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero1">
        <h1>Connecting Hearts Through Healthcare</h1>
        <p>We're building a community where unused medicines find their way to those who need them most, creating a more equitable healthcare system for everyone.</p>
      </section>

      {/* Mission Section */}
      <section className="mission1">
        <div className="card1">
          <h3>Our Mission</h3>
          <p>To reduce medicine waste and ensure everyone has access to the medications they need through a safe and efficient donation platform.</p>
        </div>
        <div className="card1">
          <h3>Community First</h3>
          <p>We believe in the power of community to create meaningful change in healthcare accessibility.</p>
        </div>
        <div className="card1">
          <h3>Quick Response</h3>
          <p>Our platform ensures swift connections between donors and recipients when time is of the essence.</p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact1">
        <h2>Our Impact</h2>
        <div className="stats1">
          <div>
            <span className="stat-number1">10K+</span>
            <span className="stat-label1">Medicines Donated</span>
          </div>
          <div>
            <span className="stat-number1">5K+</span>
            <span className="stat-label1">Lives Impacted</span>
          </div>
          <div>
            <span className="stat-number1">1K+</span>
            <span className="stat-label1">Active Donors</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works1">
        <h2>How It Works</h2>
        <div className="process1">
          <div>
            <h3>For Donors</h3>
            <p>List your unused, unexpired medications on our platform. Our verification process ensures safe and legal donations, connecting you with those in need.</p>
            <Link to="/donation" className="button1">Start Donating</Link>
          </div>
          <div>
            <h3>For Recipients</h3>
            <p>Search for needed medications and connect with donors in your area. Our platform ensures a dignified and efficient process for receiving donations.</p>
            <Link to="/findMed" className="button1">Request Medicine</Link>
          </div>
        </div>
      </section>

     
    </div>
  );
}

export default AboutPage;

