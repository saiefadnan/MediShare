import { useState, useEffect } from 'react';
import '../styles/ContactsPage.css';
import { useAuth } from '../Contexts/AuthContext';

function ContactsPage() {
  const {user} = useAuth();
  const [formData, setFormData] = useState({
    name: user?.username||'',
    email: user?.email||'',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username,
        email: user.email,
        message: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    // For this example, we'll just log it and show a success message
    console.log('Form submitted:', formData);
    setFormStatus('Thank you for your message. We\'ll get back to you soon!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contacts-page2" style={{fontFamily: 'Roboto, sans-serif'}}>
      <h1>Contact Us</h1>
      <div className="contact-content2">
        <div className="contact-info2">
          <h2>Get in Touch</h2>
          <p>We're here to help and answer any question you might have. We look forward to hearing from you!</p>
          <ul>
            <li>
              <strong>Address:</strong> Military Institute of Science and Tchnology(MIST), Mirpur Cantonment, Dhaka-1216, Bangladesh
            </li>
            <li>
              <strong>Email:</strong> <a href="mailto:medishareorg@gmail.com">medishareorg@gmail.com</a>
            </li>
            <li>
              <strong>Phone:</strong> <a href="tel:+8801723490751">+880 17 2349 0751</a>
            </li>
          </ul>
        </div>
        <div className="contact-form2">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group2">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group2">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '7px 10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              Send Message
            </button>
          </form>
          {formStatus && <p className="form-status2">{formStatus}</p>}
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;

