import React, { useState } from 'react';
import '../styles/sidebarUser.css';
import '../styles/userRequests.css'; 
import prescriptionSigned from '../assets/prescrpt.png';

function UserRequests() { 
  const [requests, setRequests] = useState([
    { id: 1, name: "Abraham", type: "Capsule", prescription: "View", date: "20/10/24" },
    { id: 2, name: "Brian", type: "Syrup", prescription: "View", date: "11/10/24" },
    { id: 3, name: "Jeremy", type: "Tablet", prescription: "View", date: "16/7/24" },
    { id: 4, name: "Sarah", type: "Capsule", prescription: "View", date: "19/7/24" },
    { id: 5, name: "Jack", type: "Capsule", prescription: "View", date: "22/7/24" },
    { id: 6, name: "Mary", type: "Laxatives", prescription: "View", date: "30/9/24" },
    { id: 7, name: "Sophia", type: "Insulin", prescription: "View", date: "15/8/24" },
    { id: 8, name: "Michael", type: "Anticoagulants", prescription: "View", date: "10/9/24" },
    { id: 9, name: "Emma", type: "Drops", prescription: "View", date: "25/10/24" },
    { id: 10, name: "James", type: "Anti-Anxiety Drugs", prescription: "View", date: "05/11/24" },
    { id: 11, name: "Olivia", type: "Diuretics", prescription: "View", date: "12/11/24" },
  ]);

  const [showNodal, setShowNodal] = useState(false); // Controls the nodal visibility

  const handleView = (id) => {
    if (id === 1) { // Check if the request is Abraham's
      setShowNodal(true);
    }
  };

  const handleCloseNodal = () => {
    setShowNodal(false);
  };

  const handleReject = (id) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  return (
    <div className="user-requests">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <img src="https://via.placeholder.com/80" alt="Profile" />
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
      <div className="main-content116">
        <h1 style={{ fontWeight: 'bold', color: 'black' }}>Requests</h1>
        <div className="table-container">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Requested by</th>
                <th>Type</th>
                <th>Prescription</th>
                <th>Date</th>
                <th>Donate/Reject</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.name}</td>
                  <td>{request.type}</td>
                  <td>
                    <a href="#" onClick={() => handleView(request.id)}>
                      {request.prescription}
                    </a>
                  </td>
                  <td>{request.date}</td>
                  <td>
                    <div className="actions">
                      <button className="donate-button">
                        <i className="fa-solid fa-check"></i> Donate
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleReject(request.id)}
                      >
                        <i className="fa-solid fa-x"></i> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nodal for Abraham's Prescription */}
      {showNodal && (
        <div className="nodal">
          <div className="nodal-content">
            <span className="klose-button116" onClick={handleCloseNodal}>
              &times;
            </span>
            <img src={prescriptionSigned} alt="Abraham's Prescription" className="prescription-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserRequests;
