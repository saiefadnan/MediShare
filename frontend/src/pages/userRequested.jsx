import React, { useState } from 'react';

import '../styles/userRequests.css';

function RequestedTable() {
  const [requested, setRequested] = useState([
    { id: 1, requestedFrom: "Alice Johnson", medicine: "Paracetamol", type: "Tablet", status: "Accepted", contact: "016XXXXXXXX" },
    { id: 2, requestedFrom: "Bob Smith", medicine: "Ibuprofen", type: "Capsule", status: "Accepted", contact: "015XXXXXXXX" },
    { id: 3, requestedFrom: "Charlie Brown", medicine: "Amoxicillin", type: "Syrup", status: "Accepted", contact: "018XXXXXXXX" },
    { id: 4, requestedFrom: "Daisy Miller", medicine: "Cough Syrup", type: "Syrup", status: "Pending", contact: "017XXXXXXXX" },
    { id: 5, requestedFrom: "Ethan Taylor", medicine: "Insulin", type: "Injection", status: "Declined", contact: "N/A" },
  ]);

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
        <h1 style={{ fontWeight: 'bold', color: 'black' }}>Requested</h1>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Requested from</th>
              <th>Medicine</th>
              <th>Type</th>
              <th>Status</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {requested.map((item) => (
              <tr key={item.id}>
                <td>{item.requestedFrom}</td>
                <td>{item.medicine}</td>
                <td>{item.type}</td>
                <td
                  className={
                    item.status === "Declined"
                      ? "status-declined"
                      : item.status === "Pending"
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
  );
}

export default RequestedTable;
