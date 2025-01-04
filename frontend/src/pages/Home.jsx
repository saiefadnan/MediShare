import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/home.css';
import heroImage from '../assets/humanitarian-help-animate.svg';
import ourImpact1 from '../assets/donation.png';
import ourImpact2 from '../assets/meds.png';
import ourImpact3 from '../assets/clean.png';
import medicine from '../assets/pharmacy.png';
import clinic from '../assets/clinic.png';
import pill from '../assets/pill.png';
import medAnimated from '../assets/medicineAnimate.svg';
import approach1 from '../assets/approach1.png';
import approach2 from '../assets/approach2.png';
import approach3 from '../assets/approach3.png';
import approach4 from '../assets/approach4.png';

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

      <section id="impact" className="impact-section">
        <div className='our-impact'>
          <h3>Our Impact</h3>
          <Container>
            <Row>
              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={ourImpact1}></img><br/>
                <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto' }}>
                  Donating medicines to the underprivileged people in our society and around the world
                </div>
              </Col>
              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={ourImpact2}></img><br/>
                <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto' }}>
                  Significantly decrease the medical waste by Donating unexpired surplus medicines
                </div>
              </Col>
              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={ourImpact3}></img><br/>
                <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto' }}>
                  Protecting our environment and building a sustainable future by reducing medical wastes
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="mission-section">
        <div className="our-mission">
          <p style={{ fontSize: '15px', color: '#56473C', fontFamily: 'Roboto' }}>
            Empowering Communities
          </p>
          <h3 style={{ color: '#365445', fontFamily: 'Quando', paddingBottom: '10px' }}>
            Our Mission
          </h3>
          <span style={{ display: 'block', width: '30%', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: '#56473C', fontFamily: 'Roboto', margin: '0' }}>
              At MediShare, we believe that access to essential medical resources is a fundamental human right
            </p>
          </span>
          <Container style={{paddingTop: '5%'}}>
            <Row>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={medicine} style={{width: '80px'}}></img><br/>
                  <h5 style={{color: '#365445', fontFamily: 'Quando' }}>Revolutionizing Medical</h5>
                  <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C' }}>
                    MediShare is committed to leveraging technology and innovative solutions to sreamline the donation process and ensure that
                  </div>
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={clinic} style={{width: '80px'}}></img><br/>
                  <h5 style={{color: '#365445', fontFamily: 'Quando' }}>Empowering Local Clinics</h5>
                  <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C' }}>
                    By working closely with local healthcare providers, MediShare ensures that donated resources are efficiently distributed to the communities that need
                  </div>
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={pill} style={{width: '80px'}}></img><br/>
                  <h5 style={{color: '#365445', fontFamily: 'Quando' }}>Advancing Global Health Equity</h5>
                  <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C' }}>
                    MediShare’s holistic approach to medical aid goes beyond simply providing supplies. we invest in capacity-building programs
                  </div>
                </Col>
              </Row>
          </Container>
        </div>
      </section>

      <section className="approach-section">
        <div>
          <Container>
            <Row>
              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <img src={medAnimated}></img>
              </Col>
              <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', paddingLeft: '10%' }}>
                <h6 style={{paddingBottom:'3%', fontFamily:'Roboto', color: '#B48675'}}>Partnering for progress</h6>
                <h3 style={{paddingBottom:'3%', maxWidth:'55%', fontFamily:'Quando', color:'#393633'}}>Transforming Lives through Compassionate Care</h3>
                <div style={{ maxWidth: '80%', fontFamily: 'Roboto', fontSize: '15px', color: '#827B76' }}>
                  At MediShare, we believe that every individual deserves access to quality healthcare, regardless of their economic or social status. By fostering collaborative partnerships with healthcare providers.
                </div>
                <div className="button-container">
                  <button onClick={donate} style={{color:'#FFFFFF', borderRadius:'50px'}}>Donate Now</button>
                </div>
              </Col>
            </Row>
            <br/>

            <Row style={{paddingTop:'9%'}}>
              <div className="our-approach">
                <p style={{ fontSize: '15px', color: '#B48675', fontFamily: 'Roboto' }}>
                  Empowering Communities
                </p>
                <h3 style={{ color: '#365445', fontFamily: 'Quando', paddingBottom: '10px' }}>
                  Our Approach
                </h3>
                <span style={{ display: 'block', width: '30%', margin: '0 auto', textAlign: 'center' }}>
                  <p style={{ fontSize: '15px', color: '#7E7772', fontFamily: 'Roboto', margin: '0' }}>
                  MediShare’s innovative approach to medical aid combines the power of technology, strategic partnerships
                  </p>
                </span>
                <Container style={{paddingTop: '3%'}}>
                  <Row style={{gap: '1rem'}}>
                      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5%', border: '1px solid #7C7573' }}>
                        <img src={approach1} style={{width: '80px'}}></img><br/>
                        <h6 style={{color: '#5E5C59', fontFamily: 'Roboto' }}>Explore Medicines</h6>
                        <h5 className='h5-hover'>Free Medicines</h5>
                        <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C', paddingTop: '3%' }}>
                          Free medicines for the marginal population
                        </div>
                      </Col>
                      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5%', border: '1px solid #7C7573' }}>
                        <img src={approach2} style={{width: '80px'}}></img><br/>
                        <h6 style={{color: '#5E5C59', fontFamily: 'Roboto' }}>Help Others</h6>
                        <h5 className='h5-hover'>Donate Now</h5>
                        <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C', paddingTop: '3%' }}>
                          Donate medicine for those in need
                        </div>
                      </Col>
                      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5%', border: '1px solid #7C7573' }}>
                        <img src={approach3} style={{width: '80px'}}></img><br/>
                        <h6 style={{color: '#5E5C59', fontFamily: 'Roboto' }}>Need Support?</h6>
                        <h5 className='h5-hover'>Get AI Support</h5>
                        <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C', paddingTop: '3%' }}>
                          For any medicine related query
                        </div>
                      </Col>
                      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5%', border: '1px solid #7C7573' }}>
                        <img src={approach4} style={{width: '80px'}}></img><br/>
                        <h6 style={{color: '#5E5C59', fontFamily: 'Roboto' }}>About Us</h6>
                        <h5 className='h5-hover'>Learn More</h5>
                        <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C', paddingTop: '3%' }}>
                          Empowering communities, Transforming lives
                        </div>
                      </Col>
                    </Row>
                </Container>
              </div>
            </Row>
          </Container>
        </div>
      </section>

      <section id="about" className="section">
        <h3>About Us</h3>
        <p>
          MediShare is a non-profit organization dedicated to providing essential medical supplies and medications to underprivileged communities around the world. Our mission is to empower communities by ensuring that everyone has access to the medical resources they need to live healthy, fulfilling lives.
        </p>
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
