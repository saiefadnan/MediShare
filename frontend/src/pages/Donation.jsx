import React, { useState } from 'react';
import '../styles/style.css';
import Footer from '../components/Footer.jsx'
import '../styles/footer.css'


const Donation = () => {
  const [formData, setFormData] = useState({
    medicineName: '',
    genericName: '',
    quantity: '',
    expiryDate: '',
    location: '',
    medicineImage: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submissionch
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    if (e.target.name === 'medicineImage') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <div>
    <div className="donation-container">
      <div className="donation-content">
        <h1 className="main-heading">YOUR ONE STEP CAN MAKE A DIFFERENCE</h1>

        <div className="donation-form-container">
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>MEDICINE NAME</label>
                <input
                  type="text"
                  name="medicineName"
                  placeholder="EX:NAPA"
                  value={formData.medicineName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>GENERIC NAME</label>
                <input
                  type="text"
                  name="genericName"
                  placeholder="EX:PARACETAMOL"
                  value={formData.genericName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>QUANTITY</label>
                <input
                  type="text"
                  name="quantity"
                  placeholder="EX:10"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>EXPIRY DATE</label>
                <div className="expiry-date-container">
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                
                </div>
              </div>

              <div className="form-group">
                <label>ADD YOUR LOCATION FROM MAP</label>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5480490037507!2d90.4237!3d23.7461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ0JzQ2LjAiTiA5MMKwMjUnMjUuMyJF!5e0!3m2!1sen!2sbd!4v1640901261000!5m2!1sen!2sbd"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              <div className="form-group">
                <label>ADD PICTURE OF YOUR MEDICINE</label>
                <div className="medicine-upload-container">
                  <label htmlFor="medicineImage" className="upload-box">
                    <img src="/placeholder.svg" alt="Upload Medicine" width={100} height={100} />
                    <input
                      type="file"
                      id="medicineImage"
                      name="medicineImage"
                      accept="image/*"
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                <p className="upload-note">EXPIRY DATE MUST BE VISIBLE</p>
              </div>

              <div className="confirmation-section">
                <div className="checkbox-container">
                  <input type="checkbox" id="confirmInfo" />
                  <label htmlFor="confirmInfo">ALL THE INFORMATION I PROVIDED IS TRUE.</label>
                </div>
                <button type="submit" className="confirm-button">CONFIRM</button>
              </div>
            </form>
          </div>

          <div className="info-section">
            <h2>Medishare</h2>
            <p className="info-description">
              Medishare is a non profit organization dedicated to providing essential medical supplies and medications to underprivileged communities around the world
            </p>
          </div>
        </div>
      </div>
       
    </div>
    <div className='footer-section'>
                  <Footer/>
              </div>
    </div>
           
            
  );
};

export default Donation;

