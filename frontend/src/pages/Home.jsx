import '../styles/home.css';

function Home() {
  return (
    <div className="Home">
      <section className="hero">
        <h2>Explore The Power of MediShare</h2>
        <p>Connecting surplus medicines with those in need.</p>
        <button>Get Started</button>
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
      </footer>
    </div>
  );
}

export default Home;