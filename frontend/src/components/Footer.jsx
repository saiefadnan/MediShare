import { Container, Row, Col } from "react-bootstrap";
import arrow from '../assets/arrow.png';
import location from '../assets/frame.png';
import email from '../assets/email.png';
import phone from '../assets/phone.png';
import share from '../assets/Share.png';
import fb from '../assets/Facebook.png';
import twitter from '../assets/Twitter.png';
import insta from '../assets/Instagram.png';
import li from '../assets/Linkedin.png';
import line from '../assets/Line.png';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer>
    <Container>
      <Row>
        <Col>
          <h4 style={{fontFamily:'quando', textAlign:'left', paddingBottom:'5%'}}>Organization</h4>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Join Academy</text></span>
          </Row>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Press Releases</text></span>
          </Row>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Upcoming Events</text></span>
          </Row>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Recent Cause</text></span>
          </Row>
          <Row style={{padding:'3% 0', maxWidth:'80%'}}>
            <span style={{textAlign:'left'}}><img src={location} style={{width:'17px'}}></img><text style={{fontFamily:'Roboto'}}> MIST, Mirpur Cantonment, Mirpur-12</text></span>
          </Row>
        </Col>
        <Col>
          <h4 style={{fontFamily:'quando', textAlign:'left', paddingBottom:'5%'}}>Support</h4>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Donate Medicine</text></span>
          </Row>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Share & Care</text></span>
          </Row>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Medicine for Children</text></span>
          </Row>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Medical Treatment</text></span>
          </Row>
          <Row style={{padding:'3% 0', maxWidth:'80%'}}>
            <span style={{textAlign:'left'}}><img src={email} style={{width:'17px'}}></img><text style={{fontFamily:'Roboto'}}> medishare@charity.ac.bd</text></span>
          </Row>
        </Col>
        <Col>
          <h4 style={{fontFamily:'quando', textAlign:'left', paddingBottom:'5%'}}>Discover</h4>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>How to Sponsor</text></span>
          </Row>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Support a Volunteer</text></span>
          </Row>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Community Attitudes</text></span>
          </Row>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><img src={arrow} style={{width:'20px'}}></img><text style={{fontFamily:'Roboto'}}>Donation and Rewards</text></span>
          </Row>
          <Row style={{padding:'3% 0', maxWidth:'80%'}}>
            <span style={{textAlign:'left'}}><img src={phone} style={{width:'17px'}}></img><text style={{fontFamily:'Roboto'}}> 01111111111</text></span>
          </Row>
        </Col>
        <Col>
          <h4 style={{fontFamily:'quando', textAlign:'left', paddingBottom:'5%'}}>About</h4>
          <Row style={{padding:'3% 0'}}>
            <span style={{textAlign:'left'}}><text style={{fontFamily:'Roboto'}}>We are a platform where you can donate unexpired surplus medicines to those who need them most. We prioritize safety, ensuring all medicines are verified and responsibly shared. Together, we bridge the gap between surplus and need, promoting health for all.</text></span>
          </Row>
          <Row style={{padding:'6% 0', maxWidth:'80%'}}>
            <span style={{textAlign:'left'}}><img src={share} style={{width:'17px'}}></img><text style={{fontFamily:'Roboto'}}> Share The Words</text></span>
            <span style={{textAlign:'left', paddingTop:'3%'}}><img src={fb} style={{width:'17px', marginLeft:'7%'}}></img><img src={twitter} style={{width:'17px', marginLeft:'7%'}}></img><img src={insta} style={{width:'17px', marginLeft:'7%'}}></img><img src={li} style={{width:'17px', marginLeft:'7%'}}></img></span>
          </Row>
        </Col>
      </Row>
    </Container>
    <img src={line} style={{width:'100%', paddingTop:'1%'}}></img>
    <div style={{ textAlign: 'center', paddingTop: '1rem', fontFamily: 'Roboto', fontSize: '14px', color: 'white' }}>
      Copyright &copy; 2025 MediShare. All rights reserved.
    </div>
  </footer>

  );
}
