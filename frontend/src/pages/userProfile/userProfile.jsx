import { useAuth } from '../../Contexts/AuthContext.jsx';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import { Alert, AlertTitle, Snackbar } from '@mui/material';

import "../../styles/sidebarUser.css";
import "./userProfile.css";

export default function ProfileEditor() {
  const { user } = useAuth();
  const userId = user?.id; 
  const email = user?.email; 
  const navigate = useNavigate();

  
  const [username, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [division, setDivision] = useState("dhaka");
  const [zipCode, setZipCode] = useState("");
  const [profilePic, setProfilePic] = useState('');
  const [imageToCrop, setImageToCrop] = useState(null); 
  const [profileImage, setProfileImage] = useState(null); 

  
  const cropperRef = useRef(null); 
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

  // eita sidebar data fetch
  useEffect(() => {
    const fetchSidebarProfileData = async () => {
      try {
        const sidebarResponse = await axios.post("http://localhost:5000/api/userProfile/getSidebarProfileData", { email });
        if (sidebarResponse.data.success) {
          const { profilePic, username, lastName } = sidebarResponse.data; // Extract data from the response
          setProfilePic(profilePic || '/placeholder.jpg');
          setUserName(username || 'Unknown');
          setLastName(lastName || 'Unknown');
        } else {
          console.error("Error fetching sidebar profile data:", sidebarResponse.data.message);
        }
      } catch (error) {
        console.error("Error fetching sidebar profile data:", error);
      }
    };

    if (email) {
      fetchSidebarProfileData(); 
    }
  }, [email]);

  // Fetch kore eita
  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/userProfile/getUserProfileData", { email: user?.email });
        if (response.data.success) {
          const { username, lastName, contactNumber, addressLine1, addressLine2, division, zipCode, profilePic } = response.data.data;
          setUserName(username || 'Unknown');
          setLastName(lastName || 'Unknown');
          setContactNumber(contactNumber || '---');
          setAddressLine1(addressLine1 || 'Not provided');
          setAddressLine2(addressLine2 || 'Not provided');
          setDivision(division || 'Not specified');
          setZipCode(zipCode || 'Not provided');
          setProfilePic(profilePic || '/placeholder.jpg');
        } else {
          console.error("Error fetching user profile data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    if (email) {
      fetchUserProfileData(); 
    }
  }, [email]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result); 
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      setProfileImage(croppedImage);
      setImageToCrop(null);
    }
  };

  const handleCancelCrop = () => {
    setImageToCrop(null); // Reset  cropper 
  };

  const handleSaveChanges = async () => {
   console.log('Save changes button clicked');
    if ( !addressLine1 || !contactNumber) {
      console.log('Please fill in the required fields: Username, Address Line 1, Contact Number, Division, and Zip Code.');
      showAlert("Please fill in the required fields: Username, Address Line 1, Contact Number, Division, and Zip Code.", 'error');
      return;
    }

    console.log('Sendging form data to the backend: ');
    console.log({
      username,
      lastName,
      email,
      contactNumber,
      addressLine1,
      addressLine2,
      division,
      zipCode,
      profileImage
    });

    const formData = new FormData();
    formData.append("username", username);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("contactNumber", contactNumber);
    formData.append("addressLine1", addressLine1);
    formData.append("addressLine2", addressLine2);
    formData.append("division", division);
    formData.append("zipCode", zipCode);
    formData.append("userId", userId);

    // Only append profile image if it's being updated
    if (profileImage) {
      try {
        const base64Data = profileImage.split(',')[1];
        const byteString = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        formData.append("profilePicture", blob, "profile-image.jpg");
      } catch (error) {
        console.error("Error processing profile image:", error);
        showAlert("There was an error processing the profile image.", 'error');
        return;
      }
    }

    console.log('Form data:', formData);
    console.log('Sending form data to the backend...');

    try {
      const response = await axios.put("http://localhost:5000/api/userProfile/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log('Response from backend:', response.data);

      if (response.data.success) {
        showAlert("Profile updated successfully!",'success');
      } else {
        alert("Error: " + response.data.message);
        showAlert("Error: "+response.data.message, 'error');
      }
    } catch (error) {
      console.error("There was an error updating the profile:", error);
      alert("Error updating profile.");
      showAlert("Error updating profile.", 'error');
    }
  };

  return (
    <div className="profile-editor">
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
      <div className="sidebar">
        <div className="profile">
          <img
            src={profilePic || "https://via.placeholder.com/80"}
            alt="Profile"
          />
          <h2>{user?.username} {user?.last_name}</h2>
          <p>{user?.email}</p>
        </div>

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
              <img
                src={profileImage || profilePic || "/placeholder.svg"}
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
              <label htmlFor="username">First Name</label>
              <input
                type="text"
                id="username"
                className="medium-textbox"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
            <button className="cancel-button" onClick={handleCancelCrop}>Cancel</button>
            <button className="save-button" onClick={handleCrop}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
