import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { fadeIn   } from '../variants';
import { useAuth } from '../Contexts/AuthContext'; 
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
import sayef from '../assets/sayef.jpeg';
import adnan from '../assets/adnan.jpeg';
import abrar from '../assets/abrar.jpeg';
import zobaer from '../assets/zobaer.png';
import ruslan from '../assets/ruslan.png';
import contact from '../assets/contact.svg';

function Home() {
  const { user } = useAuth();
  const [imageKey, setImageKey] = useState(Math.random());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const donate = () => {
    if(user){
      window.location.href='/donation'
    }else{
      window.location.href='/login'
    }
  }
  const contacts = () => {
    window.location.href='/contacts'
  }
  const findmed = () => {
    if(user){
      window.location.href='/findmed'
    }else{
      window.location.href='/login'
    }
  }

  const getAI = () => {
    if(user){
      window.location.href='/ai'
    }else{
      window.location.href='/login'
    }
  }

  const aboutUs = () => {
    window.location.href='/about'
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setImageKey(Math.random());

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="Home">
      <section className="hero">
        <div className="hero-content">
          <motion.div className="hero-text"
          variants={fadeIn('right', 0.2, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: true}}>
            <h1>Explore The Power of MediShare</h1>
            <p>Medishare is a non profit organization dedicated to providing essential medical 
            supplies and medications to underprivileged communities around the world</p>
            <div className="button-container">
              <button onClick={donate}>Donate Now!</button>
              <button onClick={findmed}><span className="button-content">Get Medicine For Free!<span className="material-symbols-outlined">expand_circle_right</span></span></button>
            </div>
          </motion.div>
          <motion.div className="hero-image"
          variants={fadeIn('left', 0.2, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: true}}>
            <img key={imageKey} src={heroImage} alt="Hero Image" />
          </motion.div>
        </div>
      </section>

      <section className="impact-section">
        <motion.div className='our-impact'
        variants={fadeIn('down', 0, 0)}
        initial="hidden"
        whileInView={"show"}
        viewport={{once: true}}>
          <motion.h3
          variants={fadeIn('down', 0.2, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: true}}>Our Impact</motion.h3>
          <motion.Container
          variants={fadeIn('up', 0.2, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: true}}>
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
          </motion.Container>
        </motion.div>
      </section>

      <section className="mission-section">
        <motion.div className="our-mission" 
        variants={fadeIn('up', 0.2, 0)}
        initial="hidden"
        whileInView={"show"}
        viewport={{once: true}}
        >
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
        </motion.div>
      </section>

      <section className="approach-section">
        <div>
          <Container>
            <Row>
              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <motion.img src={medAnimated}
                variants={fadeIn('right', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}></motion.img>
              </Col>
              <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', paddingLeft: '10%' }}>
                <motion.h6 style={{paddingBottom:'3%', fontFamily:'Roboto', color: '#B48675'}}
                variants={fadeIn('left', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>Partnering for progress</motion.h6>
                <motion.h3 style={{paddingBottom:'3%', maxWidth:'55%', fontFamily:'Quando', color:'#393633'}}
                variants={fadeIn('left', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>Transforming Lives through Compassionate Care</motion.h3>
                <motion.div style={{ maxWidth: '80%', fontFamily: 'Roboto', fontSize: '15px', color: '#827B76' }}
                variants={fadeIn('left', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>
                  At MediShare, we believe that every individual deserves access to quality healthcare, regardless of their economic or social status. By fostering collaborative partnerships with healthcare providers.
                </motion.div>
                <motion.div className="button-container"
                variants={fadeIn('left', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>
                  <button onClick={donate} style={{color:'#FFFFFF', borderRadius:'50px'}}>Donate Now</button>
                </motion.div>
              </Col>
            </Row>
            <br/>

            <Row style={{paddingTop:'9%'}}>
              <div className="our-approach">
                <motion.p style={{ fontSize: '15px', color: '#B48675', fontFamily: 'Roboto' }}
                variants={fadeIn('down', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>
                  Empowering Communities
                </motion.p>
                <motion.h3 style={{ color: '#365445', fontFamily: 'Quando', paddingBottom: '10px' }}
                variants={fadeIn('down', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>
                  Our Approach
                </motion.h3>
                <motion.span style={{ display: 'block', width: '30%', margin: '0 auto', textAlign: 'center' }}
                variants={fadeIn('down', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>
                  <p style={{ fontSize: '15px', color: '#7E7772', fontFamily: 'Roboto', margin: '0' }}>
                  MediShare’s innovative approach to medical aid combines the power of technology, strategic partnerships
                  </p>
                </motion.span>
                <Container style={{paddingTop: '3%'}}>
                  <Row style={{gap: '1rem'}}>
                      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5%', border: '1px solid #7C7573' }}>
                        <img src={approach1} style={{width: '80px'}}></img><br/>
                        <h6 style={{color: '#5E5C59', fontFamily: 'Roboto' }}>Explore Medicines</h6>
                        <button style={{backgroundColor: 'transparent', border: '0'}} onClick={findmed}><h5 className='h5-hover'>Free Medicines</h5></button>
                        <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C', paddingTop: '3%' }}>
                          Free medicines for the marginal population
                        </div>
                      </Col>
                      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5%', border: '1px solid #7C7573' }}>
                        <img src={approach2} style={{width: '80px'}}></img><br/>
                        <h6 style={{color: '#5E5C59', fontFamily: 'Roboto' }}>Help Others</h6>
                        <button style={{backgroundColor: 'transparent', border: '0'}} onClick={donate}><h5 className='h5-hover'>Donate Now</h5></button>
                        <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C', paddingTop: '3%' }}>
                          Donate medicine for those in need
                        </div>
                      </Col>
                      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5%', border: '1px solid #7C7573' }}>
                        <img src={approach3} style={{width: '80px'}}></img><br/>
                        <h6 style={{color: '#5E5C59', fontFamily: 'Roboto' }}>Need Support?</h6>
                        <button style={{backgroundColor: 'transparent', border: '0'}} onClick={getAI}><h5 className='h5-hover'>Get AI Support</h5></button>
                        <div style={{ maxWidth: '80%', textAlign: 'center', fontFamily: 'Roboto', fontSize: '15px', color: '#56473C', paddingTop: '3%' }}>
                          For any medicine related query
                        </div>
                      </Col>
                      <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5%', border: '1px solid #7C7573' }}>
                        <img src={approach4} style={{width: '80px'}}></img><br/>
                        <h6 style={{color: '#5E5C59', fontFamily: 'Roboto' }}>About Us</h6>
                        <button style={{backgroundColor: 'transparent', border: '0'}} onClick={aboutUs}><h5 className='h5-hover'>Learn More</h5></button>
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

      <section className='aboutus-section'>
        <div>
          <motion.p style={{ fontSize: '15px', color: '#464135', fontFamily: 'Roboto' }}
          variants={fadeIn('right', 0.4, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: true}}>
            Our commitment to you
          </motion.p>
          <motion.h3 style={{ color: '#393633', fontFamily: 'Quando', paddingBottom: '10px' }}
          variants={fadeIn('right', 0.4, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: true}}>
            Driven by Compassion
          </motion.h3>
          <motion.span style={{ display: 'block', width: '30%', margin: '0 auto', textAlign: 'center' }}
          variants={fadeIn('right', 0.4, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: true}}>
            <p style={{ fontSize: '15px', color: '#464135', fontFamily: 'Roboto', margin: '0' }}>
              At the heart of MediShare’s mission is a deep commitment to empowering underserved communities and ensuring equitable access to essential medical resources
            </p>
          </motion.span>
          <motion.p style={{ fontSize: '15px', color: '#464135', fontFamily: 'Roboto', paddingTop: '1%', cursor: 'pointer' }}
          variants={fadeIn('right', 0.4, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: true}}>
            Get involved
          </motion.p>
          <motion.div
          variants={fadeIn('left', 0.2, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once: true}}>
            <Container style={{paddingTop: '1%'}}>
              <Row>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="card69">
                    <div className="img">
                      <img src={sayef} style={{width: '100%', height: '100%', objectFit: 'cover'}}></img>
                    </div>
                    <span>About Me</span>
                    <p className="info">I’m Sayef, a CSE undergrad, still trying to figure out the meaning of life and trying to lern new things each day. Hustling everyday for achieving truth, justice and freedom one day In Sha Allah.</p>
                    <div className="share">
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                      </svg></a>
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                      </svg></a>
                        <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                      </svg></a>
                      <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="card69">
                    <div className="img"><img src={adnan} style={{width: '100%', height: '100%', objectFit: 'cover'}}></img></div>
                    <span>About Me</span>
                    <p className="info">The name is Adnan, a CSE undergrad and pro tier memer. I love making memes and developing 3d games. Focused, hard working and funny enough to be a strong cndidte for succeeding in life.</p>
                    <div className="share">
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                      </svg></a>
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg></a>
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                    </svg></a>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="card69">
                    <div className="img"><img src={abrar} style={{width: '100%', height: '100%', objectFit: 'cover'}}></img></div>
                    <span>About Me</span>
                    <p className="info">I’m Abrar, a badass Air Force officer, who is chilling 24/7 but achieving more than you could imagine. Ngl, winning in life Alhamdulillah.</p>
                    <div className="share">
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                      </svg></a>
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg></a>
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                    </svg></a>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="card69">
                    <div className="img"><img src={ruslan} style={{width: '100%', height: '100%', objectFit: 'cover'}}></img></div>
                    <span>About Me</span>
                    <p className="info">I’m Ruslan and I am just a chill guy. Half of my friends don&apos;t even know what I ma doing and other half don&apos;t even know where I am. In the end I am jsut a chill guy who&apos;s loved by all.</p>
                    <div className="share">
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                      </svg></a>
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg></a>
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                    </svg></a>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="card69">
                    <div className="img"><img src={zobaer} style={{width: '100%', height: '100%', objectFit: 'cover'}}></img></div>
                    <span>About Me</span>
                    <p className="info">I’m Zobaer, a focused and hard working military officer. I am the hardest working guy in the room and incredibly serious about my job and try my best everyday to be the best version of myself. ALhamdullilah I am thriving in that sector in all honestly.</p>
                    <div className="share">
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                      </svg></a>
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg></a>
                      <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                    </svg></a>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </motion.div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-us">
          <Container>
            <Row>
              <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left', paddingLeft: '5%' }}>
                <motion.h6 style={{paddingBottom:'3%', fontFamily:'Roboto', color: '#AFAA8A'}}
                variants={fadeIn('right', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>Contact us</motion.h6>
                <motion.h3 style={{paddingBottom:'3%', maxWidth:'55%', fontFamily:'Quando', color:'white'}}
                variants={fadeIn('right', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>Bridging the gap in healthcare access</motion.h3>
                <motion.div style={{ maxWidth: '70%', fontFamily: 'Roboto', fontSize: '15px', color: '#BFC6BD', paddingBottom:'3%' }}
                variants={fadeIn('right', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>
                  At the heart of MediShare’s mission is a deep commitment to empowering underserved communities and ensuring equitable access to essential medical resources
                </motion.div>
                <motion.div className="button-container"
                variants={fadeIn('right', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}>
                  <button onClick={contacts} style={{color:'#FFFFFF', borderRadius:'50px'}}>Get in Touch</button>
                </motion.div>
              </Col>
              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <motion.img src={contact}
                variants={fadeIn('left', 0.2, 0)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true}}></motion.img>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {showScrollToTop && (
        <button className="ScrollToTop" onClick={scrollToTop}>
          <svg viewBox="0 0 384 512" className="svgIcon69">
            <path
              d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
            ></path>
          </svg>
        </button>
      )}

    </div>
  );
}

export default Home;
