import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/sidebarUser.css';
import '../styles/userRequests.css'; 
import { useAuth } from '../Contexts/AuthContext.jsx'; // Make sure to import the useAuth context
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Alert, AlertTitle, Snackbar } from '@mui/material';

function UserRequests() { 
  const { user } = useAuth(); // Get the logged-in user from the context
  const [requests, setRequests] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // Default search by name
  const [profilePic116, setProfilePic116] = useState(''); // State to store the profile picture URL
  const email = user?.email; // Dynamically get the email from the logged-in user
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

  // Fetch user requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/userRequests/getUserRequestsData', { email });
        if (response.data.success) {
          console.log('Fetched requests:', response.data.data); // Log fetched requests
          setRequests(response.data.data);
          setProfilePic116(response.data.profilePic); // Update requests data
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    if (email) {
      fetchRequests();
    }
  }, [email]);

  // Filtered requests based on search term and selected filter (name/type)
  const filteredRequests = requests.filter((request) => {
    if (searchBy === 'name') {
      return request.requestedBy?.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === 'type') {
      return request.type?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  // Function to handle the "Donate" button click
  const handleDonate = async (request_id) => {
    console.log("Donate button clicked, request_id:", request_id);  // Log request_id
    
    if (!request_id) {
      showAlert('Request ID is missing', 'error');
      return; // Prevent execution if request_id is undefined
    }
    
    try {
      const response = await axios.put('http://localhost:5000/api/userRequests/updateRequestStatus', {
        request_id,
        status: 'accepted',
      });
  
      if (response.data.success) {
        setRequests(prevRequests =>
          prevRequests.map(request =>
            request.request_id === request_id ? { ...request, status: 'accepted', showButtons: false } : request
          )
        );
        showAlert('Request accepted successfully', 'success');
      }
    } catch (error) {
      console.error('Error accepting request:', error.message);
      showAlert('Error accepting request:' + error.message, 'error');
    }
  };
  
  const handleReject = async (request_id) => {
    console.log("Reject button clicked, request_id:", request_id);
    
    if (!request_id) {
      showAlert('Request ID is missing', 'error');
      return; // Prevent execution if request_id is undefined
    }
  
    try {
      const response = await axios.put('http://localhost:5000/api/userRequests/updateRequestStatus', {
        request_id,  // Send the request_id as part of the request
        status: 'rejected',
      });
  
      if (response.data.success) {
        setRequests(prevRequests =>
          prevRequests.map(request =>
            request.request_id === request_id ? { ...request, status: 'rejected', showButtons: false } : request
          )
        );
        showAlert('Request rejected successfully', 'success');
      }
    } catch (error) {
      console.error('Error rejecting request:', error.message);
      showAlert('Error rejecting request:' + error.message, 'error');
    }
  };
  
  
  return (
    <div className="user-requests">
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
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <img src={profilePic116 || 'https://defaultProfilePicURL.com/80'} alt="Profile" />
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
        <h1 style={{ fontWeight: 'bold', color: 'black' }}>Incoming Requests</h1>

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
            <option value="type">Search by Type</option>
          </select>
        </div>

        <div className="table-container116">
          <table className="requests-table116">
            <thead>
              <tr>
                <th>Requested by</th>
                <th>Type</th>
                <th>Quantity</th> 
                <th>Prescription</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {filteredRequests.map((request) => {
    console.log('Request object:', request);  // Log the full request object to see if request_id exists
    console.log('Request ID:', request.request_id);  // Log the request_id specifically to see if it is defined
    
    return (
      <tr key={request.request_id}>
        <td>{request.requestedBy}</td>
        <td>{request.type}</td>
        <td>{request.quantity}</td>
        <td>
          <Link to="/prescriptionImage" state={{ prescriptionImage: request.prescriptionImage }}>
            View
          </Link>
        </td>
        <td>{request.date}</td>
        <td>
          {request.status === 'pending' && request.showButtons !== false ? (
            <div className="actions">
              <button className="donate-button116" onClick={() => handleDonate(request.request_id)}>
                <i className="fa-solid fa-check"></i> Donate
              </button>
              <button className="reject-button116" onClick={() => handleReject(request.request_id)}>
                <i className="fa-solid fa-x"></i> Reject
              </button>
            </div>
          ) : (
            <div className="status-message">
              <span>{`You have ${request.status} this request`}</span>
            </div>
          )}
        </td>
      </tr>
    );
  })}
</tbody>


          </table>
        </div>
      </div>
    </div>
  );
}

export default UserRequests;
