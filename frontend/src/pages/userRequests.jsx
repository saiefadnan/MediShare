import React, { useState } from 'react';
import '../styles/userGlobal.css'; 
import '../styles/userRequests.css'; 

function UserRequests() { 
  const [requests, setRequests] = useState([
    { id: 1, name: "Abraham", type: "Receive", prescription: "View", date: "20/10/24" },
    { id: 2, name: "Brian", type: "Donation", prescription: "View", date: "11/10/24" },
    { id: 3, name: "Jeremy", type: "Donation", prescription: "View", date: "16/7/24" },
    { id: 4, name: "Sarah", type: "Donation", prescription: "View", date: "19/7/24" },
    { id: 5, name: "Jack", type: "Donation", prescription: "View", date: "22/7/24" },
    { id: 6, name: "Mary", type: "Receive", prescription: "View", date: "30/9/24" },
  ]);

  const handleReject = (id) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
  };

  return (
    <div className="user-requests">  {/*class name */}
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <img src="https://via.placeholder.com/80" alt="Profile" />
          <h2>John Smith</h2>
          <p>johnsmith@gmail.com</p>
        </div>

        <ul className="menu">
          <li className="menu-header">Check</li>
          <li><a href="/activity">Activity</a></li>
          <li><a href="/notifications">Notifications</a></li>
          <li><a href="/requests">Requests</a></li>
          <li><a href="/requested">Requested</a></li>

          <li className="divider"></li>

          <li className="menu-header">Manage</li>
          <li><a href="/userProfile">Edit Profile</a></li>
          <li><a href="/newItem2">New Item 2</a></li>
        </ul>
      </div>

      {/* Main Content*/}
      <div className="main-content">
        <h1 style={{ fontWeight: 'bold', color: 'black' }}>Requests</h1>
        <div className="table-container">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Name</th>
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
                  <td><a href="#">{request.prescription}</a></td>
                  <td>{request.date}</td>
                  <td>
                    <div className="actions">
                      <button className="donate-button">Donate</button>
                      <button className="reject-button" onClick={() => handleReject(request.id)}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserRequests;
