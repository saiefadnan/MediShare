import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate hooks
import '../styles/userGlobal.css'; 
import '../styles/userProfile.css';

export default function ProfileEditor() {
  const [profileImage, setProfileImage] = useState(null);
  const location = useLocation(); // Get the current route using useLocation
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-editor">
      <div className="sidebar">
        <div className="user-info">
          <div className="avatar">
            <img src={profileImage || "/placeholder.svg"} alt="Profile" />
          </div>
          <h2>John Smith</h2>
          <p>johnsmith@gmail.com</p>
        </div>
        <div className="menu-section">
          <h3>Check</h3>
          {/* Navigate to userDashboard when Activity is clicked */}
          <button
            className="menu-button"
            onClick={() => navigate('/userDashboard')}
          >
            Activity
          </button>
          <button className="menu-button">Notifications</button>
          <button className="menu-button">Requests</button>
          <button className="menu-button">Requested</button>
        </div>
        <div className="divider"></div>
        <div className="menu-section">
          <h3>Manage</h3>
          {/* Apply the 'active' class to the Edit Profile button if we're on the userProfile page */}
          <button
            className={`menu-button ${
              location.pathname === '/userProfile' ? 'active' : ''
            }`}
          >
            Edit Profile
          </button>
        </div>
        <button className="menu-button sign-out-button">Sign Out</button>
      </div>
      <div className="main-content">
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image">
              <img src={profileImage || "/placeholder.svg"} alt="Profile" />
              <label className="upload-button" htmlFor="profile-upload">
                Upload
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </div>
          </div>
          <div className="name-fields">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" defaultValue="John" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" defaultValue="Smith" />
            </div>
          </div>
        </div>
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <div className="input-with-icon">
                <input type="email" id="email" defaultValue="johnsmith@gmail.com" />
                <span className="check-icon">✓</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Contact Number</label>
              <div className="input-with-icon">
                <input type="tel" id="phone" defaultValue="01678901234" />
                <span className="check-icon">✓</span>
              </div>
            </div>
          </div>
          <div className="address-section">
            <h3>Address</h3>
            <div className="form-group">
              <label htmlFor="addressLine1">Address Line 1 *</label>
              <input
                type="text"
                id="addressLine1"
                defaultValue="House-120, Road-4, Avenue-3, Mirpur DOHS"
              />
            </div>
            <div className="form-group">
              <label htmlFor="addressLine2">Address Line 2 (optional)</label>
              <input type="text" id="addressLine2" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="division">Division</label>
                <select id="division" defaultValue="dhaka">
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="rajshahi">Rajshahi</option>
                  <option value="khulna">Khulna</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">ZIP/Postal Code</label>
                <input type="text" id="zipCode" defaultValue="1216" />
              </div>
            </div>
          </div>
          <div className="button-group">
            <button className="cancel-button">Cancel</button>
            <button className="save-button">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
