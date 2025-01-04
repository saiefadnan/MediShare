import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/userDash.css'; 
import heartIcon from '../assets/icons8-medicine-48.png';
import parcelIcon from '../assets/icons8-parcel-48.png';
import MediShareLogo from '../assets/medisharelogo.png'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function UserDashboard() {
  const [nextKey, setNextKey] = useState(4); // Start after the last uniqueKey in the initial state
  const [items, setItems] = useState([
    { uniqueKey: 1, id: 1, name: 'Napa Extra', qty: 11, expiry: '05 Dec 24' },
    { uniqueKey: 2, id: 2, name: 'Paracetamol', qty: 20, expiry: '10 Jan 25' },
    { uniqueKey: 3, id: 3, name: 'Ibuprofen', qty: 15, expiry: '15 Feb 25' },
  ]);
  

 /* const [moreItems, setMoreItems] = useState([
    { id: 4, name: 'Amoxicillin', qty: 18, expiry: '12 Mar 25' },
    { id: 5, name: 'Cefuroxime', qty: 12, expiry: '05 Apr 25' },
    { id: 6, name: 'Azithromycin', qty: 10, expiry: '22 May 25' },
  ]); */

  const [editingItemId, setEditingItemId] = useState(null);
  const [editValues, setEditValues] = useState({ id: '', name: '', qty: '' });


  const handleLoadMore = () => {
    const newItems = [
      {
        uniqueKey: nextKey,
        id: nextKey,
        name: 'Amoxicillin',
        qty: 18,
        expiry: '12 Mar 25',
      },
      {
        uniqueKey: nextKey + 1,
        id: nextKey + 1,
        name: 'Cefuroxime',
        qty: 12,
        expiry: '05 Apr 25',
      },
      {
        uniqueKey: nextKey + 2,
        id: nextKey + 2,
        name: 'Azithromycin',
        qty: 10,
        expiry: '22 May 25',
      },
    ];
    setItems([...items, ...newItems]);
    setNextKey(nextKey + 3); // Increment for next batch
  };
  
  
  const handleEdit = (item) => {
    setEditingItemId(item.uniqueKey);
    setEditValues({ name: item.name, qty: item.qty });
  };
  
  const handleSave = (uniqueKey) => {
    setItems(items.map(item =>
      item.uniqueKey === uniqueKey ? { ...item, name: editValues.name, qty: editValues.qty } : item
    ));
    setEditingItemId(null);
  };
  
  const handleCancel = () => {
    setEditingItemId(null);
  };
  
  const handleDelete = (uniqueKey) => {
    setItems(items.filter(item => item.uniqueKey !== uniqueKey));
  };
  
  

  // Data for the Chart
  const data = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Donations',
        data: [23, 15, 30],
        backgroundColor: '#ff6b6b',
        borderColor: '#ff6b6b',
        borderRadius: 5,
      },
      {
        label: 'Received',
        data: [12, 19, 22],
        backgroundColor: '#9c88ff',
        borderColor: '#9c88ff',
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Reports',
      },
    },
  };

  return (
  <div className="user-dashboard-wrapper">
    <div className="user-dashboard">
      {/* Sidebar*/}
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
      <div className="user-dashboard-main-content">
        <div className="header-container">
          <div className="header">
             <img src={MediShareLogo} alt="MediShare Icon" className="icon" /> 
             <div className="title116">MediShare</div>
    </div>
  </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card donated">
            <img src={heartIcon} alt="Heart Icon" className="heart-icon" />
            <h3>8</h3>
            <p>Donated</p>
          </div>
          <div className="dashboard-card received">
            <img src={parcelIcon} alt="Parcel Icon" className="parcel-icon" />
            <h3>3</h3>
            <p>Received</p>
          </div>
        </div>

        {/* Recent Activity and Monthly Reports */}
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
            
          </div>

          {/* Monthly Reports */}
          <div className="monthly-reports">
            <div className="header-container">
              
              <h2>Monthly Reports</h2>
            </div>
            <div className="chart-container">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="inventory">
  <h2>Inventory</h2>
  <div className="inventory-items">
    {items.map((item) => (
      <div key={item.uniqueKey} className="item">
        {editingItemId === item.uniqueKey ? (
          <>
            <input
              type="text"
              value={editValues.name}
              onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
            />
            <input
              type="number"
              value={editValues.qty}
              onChange={(e) => setEditValues({ ...editValues, qty: e.target.value })}
            />
            <div className="button-group">
              <button onClick={() => handleSave(item.uniqueKey)}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <span>{item.name}</span>
            <p>Qty: {item.qty}</p>
            <p>Expiry: {item.expiry}</p>
            <div className="button-group">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.uniqueKey)}>Delete</button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
  <button className="load-more2" onClick={handleLoadMore}>
    Load More
  </button>
</div>



      </div>
    </div>
  </div>
  );
}

export default UserDashboard;