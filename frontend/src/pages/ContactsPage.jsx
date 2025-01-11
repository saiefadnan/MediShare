import React, { useState } from 'react';
import '../styles/ContactsPage.css';

function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

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
    <div className="contacts-page2">
      <h1>Contact Us</h1>
      <div className="contact-content2">
        <div className="contact-info2">
          <h2>Get in Touch</h2>
          <p>We're here to help and answer any question you might have. We look forward to hearing from you!</p>
          <ul>
            <li>
              <strong>Address:</strong> 123 Medicine Street, Healthcare City, HC 12345
            </li>
            <li>
              <strong>Email:</strong> <a href="mailto:info@medicinedonation.org">info@medicinedonation.org</a>
            </li>
            <li>
              <strong>Phone:</strong> <a href="tel:+11234567890">+1 (123) 456-7890</a>
            </li>
          </ul>
          <h3>Hours of Operation</h3>
          <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
          <p>Saturday: 10:00 AM - 2:00 PM</p>
          <p>Sunday: Closed</p>
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
            <button type="submit">Send Message</button>
          </form>
          {formStatus && <p className="form-status2">{formStatus}</p>}
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;

