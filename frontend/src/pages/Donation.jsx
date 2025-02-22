import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import '../styles/donation.css';
import L from 'leaflet'; // Import Leaflet for the map
import 'leaflet/dist/leaflet.css';
import {Container, Row, Col} from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import jsPDF from 'jspdf';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.3, 0.1, 0.1, 1] 
    }
  }
};
const Donation = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    medicineName: '',
    genericName: '',
    companyName: '',
    diseaseName: '',
    quantity: '',
    expiryDate: '',
   // location: '',
    latitude: null,
    longitude: null,
    medicineImage: null
  });
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'success' });
  const handleAlertClose = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };
  const showAlert = (message, severity = 'success') => {
    setAlertInfo({ open: true, message, severity });
  
    setTimeout(() => {
      setAlertInfo({ ...alertInfo, open: false });
    }, 3000);
  };
  const handleChange2 = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const generatePDF = (formData, donatedId) => {
    const doc = new jsPDF();
    // Set background color
    doc.setFillColor(248, 245, 240);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Set title with color
    doc.setFontSize(18);
    doc.setFont('Roboto', 'bold');
    doc.setTextColor(69, 123, 111);
    doc.text('MediShare Donation Receipt', 105, 20, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    console.log('Title added successfully!');
    
    // Set normal font
    doc.setFontSize(12);
    doc.setFont('Roboto', 'normal');
    doc.setTextColor(0, 0, 0);
    
    // Add a bordered section with light background
    doc.setFillColor(248, 245, 240);
    doc.rect(15, 30, 180, 185, 'F');
    doc.rect(15, 30, 180, 185);
    
    // Medicine details in table format
    const startY = 50;
    const lineHeight = 10;
    const details = [
        ['Donation ID:', donatedId],
        ['Donor Name:', user.username],
        ['Medicine Name:', formData.medicineName],
        ['Generic Name:', formData.genericName],
        ['Company Name:', formData.companyName],
        ['Probable Disease:', formData.diseaseName],
        ['Quantity:', formData.quantity],
        ['Expiry Date:', formData.expiryDate],
        ['Latitude:', formData.latitude],
        ['Longitude:', formData.longitude]
    ];
    
    details.forEach((detail, index) => {
        doc.setTextColor(69, 123, 111);
        doc.text(`${detail[0]}`, 25, startY + index * lineHeight);
        doc.setTextColor(0, 0, 0);
        doc.text(`${detail[1]}`, 70, startY + index * lineHeight);
    });
    // Add medicine image if available before the footer
    if (formData.medicineImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgData = e.target.result;
            const imgWidth = 50; // Adjust size as needed
            const imgHeight = 50; // Adjust size as needed
            const xPos = (doc.internal.pageSize.getWidth() - imgWidth) / 2; // Center the image horizontally
            const yPos = startY + details.length * lineHeight + 5; // Position below the details

            doc.addImage(imgData, 'JPEG', xPos, yPos, imgWidth, imgHeight);
            
            // Footer after image
            doc.setFontSize(10);
            doc.setTextColor(69, 123, 111);
            doc.text('Thank you for your donation!', 105, 270, { align: 'center' });
            
            doc.save('donation_receipt.pdf');
        };
        reader.readAsDataURL(formData.medicineImage);
    } else {
        // Footer if no image
        doc.setFontSize(10);
        doc.setTextColor(69, 123, 111);
        doc.text('Thank you for your donation!', 105, 270, { align: 'center' });
        
        doc.save('donation_receipt.pdf');
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { medicineName, genericName, companyName, diseaseName, quantity, expiryDate, latitude, longitude, medicineImage } = formData;
  
    // Validation check
    if (!medicineName || !genericName || !companyName || !diseaseName || !quantity || !expiryDate || !latitude || !longitude || !medicineImage) {
      showAlert('Please fill in all fields.', 'error');
      return;
    }
  
    try {
      const donorId = user.id;
      const status = 'Available';
  
      // Create FormData object to send image as a file
      const formDataToSend = new FormData();
      formDataToSend.append('medicineName', medicineName);
      formDataToSend.append('genericName', genericName);
      formDataToSend.append('companyName', companyName);
      formDataToSend.append('diseaseName', diseaseName);
      formDataToSend.append('quantity', quantity);
      formDataToSend.append('expiryDate', expiryDate);
      formDataToSend.append('latitude', latitude);
      formDataToSend.append('longitude', longitude);
      formDataToSend.append('medicineImage', medicineImage); // Append image file
      formDataToSend.append('status', status);
      formDataToSend.append('donorId', donorId);
  
      // Send the POST request
      const response = await fetch('http://localhost:5000/api/donation/donate-medicine', {
        method: 'POST',
        body: formDataToSend, // Send FormData instead of JSON
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error('Error inserting data:', data.message);
        showAlert('There was an issue submitting the data.', 'error');
      } else {
        console.log('Data inserted successfully:', data);
        showAlert('Donation submitted successfully!', 'success');
        const donatedId = data.donationId;
        generatePDF(formData, donatedId);
  
        // Reset form data
        setFormData({
          medicineName: '',
          genericName: '',
          companyName: '',
          diseaseName: '',
          quantity: '',
          expiryDate: '',
          latitude: null,
          longitude: null,
          medicineImage: null,
        });
  
        setImagePreview('/placeholder.svg');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      showAlert('An unexpected error occurred: '+err.message, 'error');
    }
  };
  

  const handleChange = (e) => {
   
    const { name, value, files } = e.target;
    if (name === "expiryDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      const minValidDate = new Date();
      minValidDate.setMonth(today.getMonth() + 2); // Minimum two months ahead
  
      if (selectedDate < minValidDate) {
        showAlert("Expiry date must be at least 2 months from today!", "error");
        return;
      }
    }
    if (name === 'medicineImage' && files.length > 0) {
        const file = files[0];

        // Show image preview
        setImagePreview(URL.createObjectURL(file));

        // Store the file in formData state
        setFormData((prevState) => ({
            ...prevState,
            medicineImage: file, // Store file directly
        }));
    } else {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, medicineImage: file });
      setImagePreview(URL.createObjectURL(file)); // Show a preview of the image
    }
  };
  const [imagePreview, setImagePreview] = useState('/placeholder.svg'); // Initialize imagePreview
  // Initialize the map when component mounts
  useEffect(() => {
    // Default coordinates
    const initialLatitude = 23.7461;
    const initialLongitude = 90.4237;

    // Create map instance
    const map = L.map('map').setView([initialLatitude, initialLongitude], 15);

    // Add a high-contrast, visually clear tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors, Humanitarian OpenStreetMap Team',
    }).addTo(map);

    // Custom icon with better styling
    const customIcon = L.icon({
      iconUrl: '../public/custom-icon.svg', // Provide the path to your custom icon here
      iconSize: [45, 45], // Adjusted size for better visibility
      iconAnchor: [22, 45],
      popupAnchor: [0, -45],
    });

    // Marker for initial position with popup
    const marker = L.marker([initialLatitude, initialLongitude], { icon: customIcon }).addTo(map)
      .bindPopup('<b>Your Location</b><br>Click anywhere to move the marker.')
      .openPopup();

    // Map click event to capture coordinates
    map.on('click', (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      // Log coordinates (for debugging purposes)
      console.log('Selected Coordinates:', lat, lng);

      // Update state with the selected coordinates
      setFormData((prevState) => ({
        ...prevState,
        latitude: lat,
        longitude: lng,
      }));

      // Move marker to the clicked location and update popup
      marker.setLatLng([lat, lng])
        .bindPopup(`<b>Selected Location</b><br>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`).openPopup();
    });

    // Cleanup on unmount
    return () => {
      map.off();
      map.remove();
    };
  }, []);



  return (
    <div className="donation-container">
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleAlertClose} severity={alertInfo.severity} variant="filled">
          <AlertTitle>{alertInfo.severity === 'error' ? 'Error' : 'Success'}</AlertTitle>
          {alertInfo.message}
        </Alert>
      </Snackbar>
      <Container style={{fontFamily: 'roboto'}}>
      <Row>
        <motion.h1 
          className="main-heading"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            ease: [0.3, 0.1, 0.1, 1]
          }}
          style={{fontFamily: 'quando'}}
        >
          YOUR ONE STEP CAN MAKE A DIFFERENCE
        </motion.h1>

          <motion.div
            className="info-section"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.9,
              delay: 0.5,
              ease: [0.3, 0.1, 0.1, 1]
            }}
          >
            <h2 style={{ textAlign: 'center', color: '#e2d8c8', fontFamily: 'roboto', fontWeight: '600' }}>MediShare</h2>
            <p className="info-description" style={{ textAlign: 'center', color: '#e2d8c8', fontFamily: 'roboto' }}>
              Medishare is a non-profit organization dedicated to providing essential medical supplies and medications to underprivileged communities around the world
            </p>
          </motion.div>
        </Row><br/>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row>
            <Col>
              <motion.div variants={itemVariants}>
                <form onSubmit={handleSubmit}>
                            <div className="form-group">
                            <label>MEDICINE NAME</label>
                            <input
                                type="text"
                                name="medicineName"
                                placeholder="EX: NAPA"
                                value={formData.medicineName}
                                onChange={handleChange}
                            />
                            </div><br/>

                            <div className="form-group">
                            <label>GENERIC NAME</label>
                            <input
                                type="text"
                                name="genericName"
                                placeholder="EX: PARACETAMOL"
                                value={formData.genericName}
                                onChange={handleChange}
                            />
                            </div><br/>
                            <div className="form-group">
                            <label>COMPANY NAME</label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="EX: Beximco"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                            </div><br/>
                            <div className="form-group">
                            <label>PROBABLE DISEASE</label>
                            <input
                                type="text"
                                name="diseaseName"
                                placeholder="EX: COMMON COLD"
                                value={formData.diseaseName}
                                onChange={handleChange}
                            />
                            </div><br/>

                            <div className="form-group">
                            <label>QUANTITY</label>
                            <input
                                type="text"
                                name="quantity"
                                placeholder="EX: 10"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                            </div><br/>

                            <div className="form-group">
                            <label>EXPIRY DATE</label>
                            <div className="expiry-date-container">
                                <input
                                type="date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                />
                            </div><br/>
                            </div>
                        </form>
                        </motion.div>
                    </Col>
                    <Col>
              <motion.div variants={itemVariants}>
                <form onSubmit={handleSubmit}>
                  <motion.div
                    className="form-group"
                    variants={itemVariants}
                  >
                    <label>ADD YOUR LOCATION FROM MAP</label>
                    <div className="map-container">
                      <div id="map" style={{ width: '100%', height: '300px' }}></div>
                    </div>
                  </motion.div><br/>

                  <motion.div
                    className="form-group"
                    variants={itemVariants}
                  >
                  <label>ADD PICTURE OF YOUR MEDICINE</label>
                  <div className="medicine-upload-container">
                    <motion.label
                        htmlFor="medicineImage"
                        className="upload-box"
                        whileHover={{ scale: 1.02 }}
                        transition={{ 
                          type: 'tween', 
                          duration: 0.4,
                          ease: [0.3, 0.1, 0.1, 1]
                        }}
                      >
                        <img src={imagePreview} alt="Upload Medicine" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', backgroundColor: '#f4f4f4' }} />
                        <input
                          type="file"
                          id="medicineImage"
                          name="medicineImage"
                          accept="image/*"
                          onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                    </motion.label>
                  </div>
                  <p className="upload-note">EXPIRY DATE MUST BE VISIBLE</p>
                  </motion.div>

                  <motion.div
                    className="confirmation-section"
                    variants={itemVariants}
                  >
                    <div className="checkbox-container">
                      <input type="checkbox" id="confirmInfo" />
                      <label htmlFor="confirmInfo">ALL THE INFORMATION I PROVIDED IS TRUE.</label>
                    </div>
                    <motion.button
                      type="submit"
                      className="confirm-button"
                      whileHover={{ 
                        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                        transition: { 
                          duration: 0.4,
                          ease: [0.3, 0.1, 0.1, 1]
                        }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      CONFIRM
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </Col>
                </Row>
                </motion.div>
            </Container>
        </div>
  );
};

export default Donation;
