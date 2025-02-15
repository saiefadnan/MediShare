import { useAuth } from '../../Contexts/AuthContext.jsx';

import React, { useState, useEffect, useRef } from "react";

//import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios"; // Import axios for API calls

import "../../styles/sidebarUser.css";
import "./userProfile.css";

export default function ProfileEditor() {
  const {user}=useAuth();

  const userId = user?.id;  // Get the logged-in user's ID
  const email = user?.email; // Get the logged-in user's email

  //const userId=user.id;


  const [imageToCrop, setImageToCrop] = useState(null);
  const cropperRef = useRef(null);
  const navigate = useNavigate();

  // States to hold form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [division, setDivision] = useState("dhaka");
  const [zipCode, setZipCode] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/getProfile", { email });
        if (response.data.success) {
          const { first_name, last_name, contact_number, address_line_1, address_line_2, division, zip_code, profile_picture_url } = response.data.data;
          setFirstName(first_name);
          setLastName(last_name);
          //setEmail(email);
          setContactNumber(contact_number);
          setAddressLine1(address_line_1);
          setAddressLine2(address_line_2);
          setDivision(division);
          setZipCode(zip_code);
          setProfileImage(profile_picture_url);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfile();
  }, [email]);
  

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

  // Function to handle form submission
  const handleSaveChanges = async () => {
    // Validate form data
    if (!firstName || !lastName || !email) {
      alert("Please fill in the required fields: First Name, Last Name, and Email.");
      return;
    }
  
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email); // Include the logged-in user's email
    formData.append("contactNumber", contactNumber);
    formData.append("addressLine1", addressLine1);
    formData.append("addressLine2", addressLine2);
    formData.append("division", division);
    formData.append("zipCode", zipCode);
    formData.append("userId", userId); // Include the logged-in user's ID
  
    // Check and process profile image if available
    if (profileImage) {
      try {
        // Convert base64 to file and append to formData for upload
        const base64Data = profileImage.split(',')[1]; // Clean base64 string
        const byteString = atob(base64Data); // Decode base64
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
    
        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }
    
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });  // Blob with appropriate MIME type
        formData.append("profilePicture", blob, "profile-image.jpg"); // Append as file to formData
      } catch (error) {
        console.error("Error processing profile image:", error);
        alert("There was an error processing the profile image.");
        return;
      }
    }
    
  
    try {
      // Send the form data to the backend (replace with your actual API URL)
      const response = await axios.put("http://localhost:5000/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure backend accepts multipart form-data
        },
      });
  
      if (response.data.success) {
        alert("Profile updated successfully!");
        navigate('/userDashboard'); // Redirect to dashboard after successful update
      } else {
        alert("Error: " + response.data.message); // Handle error response from backend
      }
    } catch (error) {
      console.error("There was an error updating the profile:", error);
      alert("Error updating profile."); // Handle network or API errors
    }
  };
  
  
  

  // Helper function to convert base64 to blob
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: 'image/jpeg' });
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
          <h2>{firstName} {lastName}</h2>
          <p>{email}</p>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group116">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="medium-textbox"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              //onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          <div className="form-group116">
            <label htmlFor="phone">Contact Number</label>
            <input
              type="tel"
              id="phone"
              className="medium-textbox"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
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
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>
            <div className="form-group116">
              <label htmlFor="division">Division</label>
              <select
                id="division"
                className="small-textbox"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
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
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>

            <div className="form-group116">
              <label htmlFor="zipCode">ZIP/Postal Code</label>
              <input
                type="text"
                id="zipCode"
                className="small-textbox"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="cancel-button">Cancel</button>
          <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
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
