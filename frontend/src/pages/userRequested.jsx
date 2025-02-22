import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/userRequests.css';
import { useAuth } from '../Contexts/AuthContext.jsx'; // Import the useAuth context
import { Link } from 'react-router-dom'; // Import Link for navigation

function RequestedTable() {
  const { user } = useAuth(); // Get the logged-in user from the context
  const [profilePic, setProfilePic] = useState('');
  const [requested, setRequested] = useState([]);
  const email = user?.email;

  // Fetch profile picture from backend
  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/userRequested/getProfilePic', { email }); // Fetch profile pic using the logged-in user's email
        console.log(response.data); // Log the response to verify the profile picture URL
        if (response.data.success) {
          setProfilePic(response.data.profilePic);
        } else {
          console.error('Error fetching profile picture:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    if (email) {
      fetchProfilePic();
    }
  }, [email]);

  useEffect(() => {
    const fetchRequestedData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/userRequested/getUserRequestedData', { email });
        if (response.data.success) {
          console.log('Fetched requested data:', response.data.data);
          setRequested(response.data.data); // Set the requested data from API
        } else {
          console.error('Error fetching requested data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching requested data:', error);
      }
    };

    if (email) {
      fetchRequestedData();
    }
  }, [email]);



  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // Default search by name

  // Filtered requests based on search term and selected filter (name/medicine)
  const filteredRequests = requested.filter((item) => {
    if (searchBy === 'name') {
      return item.requestedFrom.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === 'medicine') {
      return item.medicine.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;  // Added to support future filters and avoid returning undefined
  });

  return (
    <div className="user-requests">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <img src={profilePic || 'https://via.placeholder.com/80'} alt="Profile" /> {/* Display profile picture */}
          <h2>{user?.username} {user?.last_name}</h2> {/* Display the logged-in user's username */}
          <p>{user?.email}</p>
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
      <div className="main-content116">
        <h1 style={{ fontWeight: 'bold', color: 'black' }}>Requested</h1>

        {/* Search Bar and Dropdown */}
        <div className="search-container116">
          <input
            type="text"
            className="search-bar116"
            placeholder={`Search by ${searchBy}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="search-select116"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="name">Search by Name</option>
            <option value="medicine">Search by Medicine</option>
          </select>
        </div>

        <div className="table-container116">
          <table className="requests-table116">
            <thead>
              <tr>
                <th>Requested from</th>
                <th>Medicine</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((item) => (
                <tr key={item.request_id}>
                  <td>{item.requestedFrom || 'Unknown'}</td>  {/* Fallback for missing requestedFrom */}
                  <td>{item.medicine}</td>
                  <td>{item.quantity}</td> {/* Updated column for quantity */}
                  <td
                    className={
                      item.status === "rejected"
                        ? "status-declined"
                        : item.status === "pending"
                        ? "status-pending"
                        : "status-accepted"
                    }
                  >
                    {item.status}
                  </td>
                  <td>{item.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RequestedTable;
