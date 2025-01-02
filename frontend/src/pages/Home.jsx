import { useEffect, useState } from 'react';
import '../styles/home.css';
import heroImage from '../assets/humanitarian-help-animate.svg';

function Home() {
  const [imageKey, setImageKey] = useState(Math.random());
  const donate = () => {
    window.location.href='/donation'
  }
  const findmed = () => {
    window.location.href='/findmed'
  }

  useEffect(() => {
    setImageKey(Math.random());
  }, []);

  return (
    <div className="Home">

      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Explore The Power of MediShare</h1>
            <p>Medishare is a non profit organization dedicated to providing essential medical 
            supplies and medications to underprivileged communities around the world</p>
            <div className="button-container">
              <button onClick={donate}>Donate Now!</button>
              <button onClick={findmed}><span className="button-content">Get Medicine For Free!<span className="material-symbols-outlined">expand_circle_right</span></span></button>
            </div>
          </div>
          <div className="hero-image">
            <img key={imageKey} src={heroImage} alt="Hero Image" />
          </div>
        </div>
      </section>

      <section id="impact" className="section">
        <h3>Our Impact</h3>
        <div className="cards">
          <div className="card">
            <img src="https://via.placeholder.com/300" alt="Impact 1" />
            <p>Helping communities stay healthy.</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/300" alt="Impact 2" />
            <p>Delivering unused medicines responsibly.</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/300" alt="Impact 3" />
            <p>Saving lives through collective efforts.</p>
          </div>
        </div>
      </section>

      <section id="mission" className="section" style={{ backgroundColor: 'var(--light-beige)' }}>
        <h3>Our Mission</h3>
        <p>To ensure surplus medicines reach those who need them most.</p>
      </section>

      <section id="approach" className="section">
        <h3>Our Approach</h3>
        <div className="cards">
          <div className="card">
            <h4>Identify</h4>
            <p>Find surplus medicines in communities.</p>
          </div>
          <div className="card">
            <h4>Distribute</h4>
            <p>Channel medicines to underprivileged areas.</p>
          </div>
          <div className="card">
            <h4>Support</h4>
            <p>Provide ongoing assistance to recipients.</p>
          </div>
        </div>
      </section>

      <footer id="contact">
        <p>&copy; 2024 MediShare. All Rights Reserved.</p>
        <p>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
