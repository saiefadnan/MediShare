import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

import "../../styles/sidebarUser.css";
import "./userProfile.css";

export default function ProfileEditor() {
  const [profileImage, setProfileImage] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const cropperRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result); // Set the image to crop
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      setProfileImage(croppedImage); // Set the cropped image as the profile picture
      setImageToCrop(null); // Close the cropping modal
    }
  };

  const handleCancelCrop = () => {
    setImageToCrop(null); // Cancel cropping and close the modal
  };

  return (
    <div className="profile-editor">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          {/* Sidebar profile image */}
          <img
            src={profileImage || "https://via.placeholder.com/80"}
            alt="Profile"
          />
          <h2>John Smith</h2>
          <p>johnsmith@gmail.com</p>
        </div>

        {/* Sidebar Menu */}
        <ul className="menu">
          <li className="menu-header">Check</li>
          <li>
            <a href="/userDashboard">
              <i className="fa-solid fa-book"></i> Activity
            </a>
          </li>
         
          <li>
            <a href="/userRequests">
              <i className="fa-solid fa-inbox"></i> Requests
            </a>
          </li>
          <li>
            <a href="/userRequested">
              <i className="fa-solid fa-comment-medical"></i> Requested
            </a>
          </li>

          <li className="divider"></li>

          <li className="menu-header">Manage</li>
          <li>
            <a href="/userProfile">
              <i className="fa-solid fa-pen"></i> Edit Profile
            </a>
          </li>
        </ul>

        <button className="sign-out" onClick={() => window.location.href = '/login'}>
    <i className="fa-solid fa-right-from-bracket"></i> Sign Out
  </button>
      </div>

      {/* Main Content */}
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-image-section">
            <div className="profile-image">
              {/* Main profile image */}
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
              />
            </div>
            <div className="upload-popup">
              <label className="upload-button" htmlFor="profile-upload">
                Change Profile Picture
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
            <div className="form-group116">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="medium-textbox"
                defaultValue="John"
              />
            </div>
            <div className="form-group116">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="medium-textbox"
                defaultValue="Smith"
              />
            </div>
          </div>
        </div>

        <hr className="divider-specific" />

        {/* Email and Contact Section */}
        <div className="middle-div">
          <div className="form-group116">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              className="medium-textbox"
              defaultValue="johnsmith@gmail.com"
            />
          </div>

          <div className="form-group116">
            <label htmlFor="phone">Contact Number</label>
            <input
              type="tel"
              id="phone"
              className="medium-textbox"
              defaultValue="01678901234"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="user-address-section">
          <h3>Address</h3>
          <div className="add-div1">
            <div className="form-group116">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                className="large-textbox"
                defaultValue="House-120, Road-4, Avenue-3, Mirpur DOHS"
              />
            </div>
            <div className="form-group116">
              <label htmlFor="division">Division</label>
              <select
                id="division"
                className="small-textbox"
                defaultValue="dhaka"
              >
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="khulna">Khulna</option>
              </select>
            </div>
          </div>

          <div className="add-div2">
            <div className="form-group116">
              <label htmlFor="addressLine2">Address Line 2 (optional)</label>
              <input
                type="text"
                id="addressLine2"
                className="large-textbox"
              />
            </div>

            <div className="form-group116">
              <label htmlFor="zipCode">ZIP/Postal Code</label>
              <input
                type="text"
                id="zipCode"
                className="small-textbox"
                defaultValue="1216"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="cancel-button">Cancel</button>
          <button className="save-button">Save Changes</button>
        </div>
      </div>

      {/* Cropping Modal */}
      {imageToCrop && (
        <div className="cropping-modal">
          <Cropper
            src={imageToCrop}
            style={{ height: 400, width: "100%" }}
            aspectRatio={1}
            guides={true}
            ref={cropperRef}
          />
          <div className="button-group">
            <button className="cancel-button" onClick={handleCancelCrop}>
              Cancel
            </button>
            <button className="save-button" onClick={handleCrop}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
