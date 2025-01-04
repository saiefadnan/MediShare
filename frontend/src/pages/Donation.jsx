import { useState, useEffect } from 'react';
import '../styles/donation.css';

import L from 'leaflet'; // Import Leaflet for the map
import 'leaflet/dist/leaflet.css';



const Donation = () => {
  const [formData, setFormData] = useState({
    medicineName: '',
    genericName: '',
    quantity: '',
    expiryDate: '',
    location: '',
    latitude: null,
    longitude: null,
    medicineImage: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'medicineImage' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update imagePreview
        setFormData((prevState) => ({
          ...prevState,
          [name]: file,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
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

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Custom icon
    const customIcon = L.icon({
      iconUrl: '../public/custom-icon.svg', // Provide the path to your custom icon here
      iconSize: [40, 40],         // Adjust the size of the icon
      iconAnchor: [20, 40],       // Anchor the icon correctly
    });

    // Marker for initial position
    const marker = L.marker([initialLatitude, initialLongitude], { icon: customIcon }).addTo(map);

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

      // Move marker to the clicked location
      //<i classname="fa-solid fa-location-pin"></i>
      marker.setLatLng([lat, lng]);
    });

    // Cleanup on unmount
    return () => {
      map.off();
      map.remove();
    };
  }, []);

  return (
    <div>
      <div className="donation-container">
        <div className="donation-content">
          <h1 className="main-heading">YOUR ONE STEP CAN MAKE A DIFFERENCE</h1>

          <div className="donation-form-container">
            <div className="form-section100">
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
                </div>

                <div className="form-group">
                  <label>GENERIC NAME</label>
                  <input
                    type="text"
                    name="genericName"
                    placeholder="EX: PARACETAMOL"
                    value={formData.genericName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>QUANTITY</label>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="EX: 10"
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
                    {/* Map Container with Leaflet */}
                    <div id="map" style={{ width: '100%', height: '300px' }}></div>
                  </div>
                </div>

                <div className="form-group">
                  <label>ADD PICTURE OF YOUR MEDICINE</label>
                  <div className="medicine-upload-container">
                    <label htmlFor="medicineImage" className="upload-box">
                      <img src={imagePreview} alt="Upload Medicine" width={500} height={200} />
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
                Medishare is a non-profit organization dedicated to providing essential medical supplies and medications to underprivileged communities around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
