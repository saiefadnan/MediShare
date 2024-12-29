import React, { useState } from 'react';
import '../styles/userDash.css'; // Import the CSS file for UserDashboard

function UserDashboard() {
  const [items, setItems] = useState([
    { id: 1, name: 'Napa Extra', qty: 11, expiry: '05 Dec 24' },
    { id: 2, name: 'Napa Extra', qty: 11, expiry: '05 Dec 24' },
    { id: 3, name: 'Napa Extra', qty: 11, expiry: '05 Dec 24' },
  ]);

  const handleDelete = (itemId) => {
    // Remove the item from the inventory based on the id
    setItems(items.filter(item => item.id !== itemId));
  };

  return (
    <div className="user-dashboard">
      {/* Sidebar remains unchanged */}
      <div className="sidebar">
        <div className="profile">
          <img src="https://via.placeholder.com/80" alt="Profile" />
          <h2>John Smith</h2>
          <p>johnsmith@gmail.com</p>
        </div>

        {/* Sidebar Menu */}
        <ul className="menu">
          <li className="menu-header">Check</li>
          <li><a href="/activity">Activity</a></li>
          <li><a href="/notifications">Notifications</a></li>
          <li><a href="/requests">Requests</a></li>
          <li><a href="/requested">Requested</a></li>

          <li className="divider"></li>

          <li className="menu-header">Manage</li>
          <li><a href="/userProfile">Edit Profile</a></li>
        </ul>

        <button className="sign-out">Sign Out</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="title">MediShare</div>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card donated">
            <h3>8</h3>
            <p>Donated</p>
          </div>
          <div className="dashboard-card received">
            <h3>3</h3>
            <p>Received</p>
          </div>
        </div>

        {/* Recent Activity and Monthly Reports Side by Side */}
        <div className="side-by-side">
          {/* Recent Activity */}
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <p className="overview">Overview of most recent</p>
            <div className="activity-table-container">
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Abraham</td>
                    <td>Receive</td>
                    <td>Complete</td>
                    <td>20/10/24</td>
                  </tr>
                  <tr>
                    <td>Brian</td>
                    <td>Donation</td>
                    <td>Complete</td>
                    <td>11/10/24</td>
                  </tr>
                  <tr>
                    <td>Jeremy</td>
                    <td>Donation</td>
                    <td>Complete</td>
                    <td>16/7/24</td>
                  </tr>
                  <tr>
                    <td>Sarah</td>
                    <td>Donation</td>
                    <td>Complete</td>
                    <td>19/7/24</td>
                  </tr>
                  <tr>
                    <td>Jack</td>
                    <td>Donation</td>
                    <td>Complete</td>
                    <td>22/7/24</td>
                  </tr>
                  <tr>
                    <td>Mary</td>
                    <td>Receive</td>
                    <td>Complete</td>
                    <td>30/9/24</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="load-more">Load More</button>
          </div>

          {/* Monthly Reports */}
          <div className="monthly-reports">
            <div className="header-container">
              <h2>Monthly Reports</h2>
            </div>
            <div className="chart-container">
              <p>Chart Placeholder</p>
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
                <p>Qty: {item.qty}</p>
                <p>Expiry: {item.expiry}</p>
                <div className="button-group">
                  <button>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <button className="load-more">Load More</button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
