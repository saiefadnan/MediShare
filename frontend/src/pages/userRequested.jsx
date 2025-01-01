import React, { useState } from 'react';

import '../styles/userRequests.css';

function RequestedTable() {
  const [requested, setRequested] = useState([
    { id: 1, medicine: "Paracetamol", type: "Tablet", status: "Accepted", contact: "016XXXXXXXX" },
    { id: 2, medicine: "Ibuprofen", type: "Capsule", status: "Accepted", contact: "015XXXXXXXX" },
    { id: 3, medicine: "Amoxicillin", type: "Syrup", status: "Accepted", contact: "018XXXXXXXX" },
    { id: 4, medicine: "Cough Syrup", type: "Syrup", status: "Pending", contact: "017XXXXXXXX" },
    { id: 5, medicine: "Insulin", type: "Injection", status: "Declined", contact: "N/A" },
  ]);

  const handleReject = (id) => {
    setRequested((prevRequested) => prevRequested.filter((item) => item.id !== id));
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
        <h1 style={{ fontWeight: 'bold', color: 'black' }}>Requested</h1>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Type</th>
              <th>Status</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requested.map((item) => (
              <tr key={item.id}>
                <td>{item.medicine}</td>
                <td>{item.type}</td>
                <td>{item.status}</td>
                <td>{item.contact}</td>
                <td>
                  {item.status !== "Declined" && item.status !== "Accepted" &&(
                    <button onClick={() => handleReject(item.id)}>Remove</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestedTable;
