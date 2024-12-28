import '../styles/home.css';

function Home() {
  const donate = () => {
    window.location.href='/donation'
  }
  const findmed = () => {
    window.location.href='/findmed'
  }

  return (
    <div className="Home">
      <header className="header">
        <h1>MediShare</h1>
        <nav>
          <a href="#impact">Impact</a>
          <a href="#mission">Mission</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Explore The Power of MediShare</h2>
        <p>Connecting surplus medicines with those in need.</p>
        <div className="button-container">
          <button onClick={donate}>Donate Now!</button>
          <button onClick={findmed}>Get Medicine For Free!</button>
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
