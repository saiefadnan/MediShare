import React, { useState } from 'react';
import '../styles/userGlobal.css'; 
import '../styles/userDash.css'; // Import the CSS file for UserDashboard

function UserDashboard() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ]);

  const handleDelete = (itemId) => {
    // Remove the item from the inventory based on the id
    setItems(items.filter(item => item.id !== itemId));
  };

  return (
    <div className="user-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <img src="https://via.placeholder.com/80" alt="Profile" />
          <h2>John Smith</h2>
          <p>johnsmith@gmail.com</p>
        </div>

        {/* Sidebar Menu */}
        <ul className="menu">
          <li className="menu-header">Check</li> {/* "Check" header */}
          <li><a href="/activity">Activity</a></li>
          <li><a href="/notifications">Notifications</a></li>
          <li><a href="/requests">Requests</a></li>
          <li><a href="/requested">Requested</a></li>

          {/* White line to separate the next section */}
          <li className="divider"></li> {/* Divider for separation */}

          {/* New section with another header */}
          <li className="menu-header">Manage</li>
          <li><a href="/userProfile">Edit Profile</a></li>
          <li><a href="/newItem2">New Item 2</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="title">MediShare</div>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card donated">
            <h3>10</h3>
            <p>Amount Donated</p>
          </div>
          <div className="dashboard-card received">
            <h3>5</h3>
            <p>Amount Received</p>
          </div>
        </div>

        {/* Recent Activity and Monthly Reports Side by Side */}
        <div className="side-by-side">
          {/* Recent Activity */}
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dec 25, 2024</td>
                  <td>Donation</td>
                  <td>$100</td>
                </tr>
                <tr>
                  <td>Dec 24, 2024</td>
                  <td>Received Donation</td>
                  <td>$50</td>
                </tr>
              </tbody>
            </table>
          </div>
            
          {/* Monthly Reports - Placeholder Graph */}
          <div className="monthly-reports">
            <h2>Monthly Reports</h2>
            <div className="graph-placeholder">
              <p>Graph Placeholder</p>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="inventory">
          <h2>Inventory</h2>
          <div className="inventory-items">
            {items.map((item) => (
              <div key={item.id} className="item">
                <span>{item.name}</span>
                <div className="button-group">
                  <button>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;
