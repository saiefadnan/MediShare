import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../Contexts/AuthContext.jsx';
import axios from 'axios';
import '../styles/userDash.css'; 
import heartIcon from '../../public/assets/icons8-medicine-48.png';
import parcelIcon from '../../public/assets/icons8-parcel-48.png';
import MediShareLogo from '../../public/assets/medisharelogo.png'; 
//import { set } from '../../../backend/config/mail.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function UserDashboard() {

  const { user } = useAuth();
  const email = user?.email; 
  //const userId = user?.id;  
  //const [nextKey, setNextKey] = useState(4); 
  //const [items, setItems] = useState([]);
  const [donationsData, setDonationsData] = useState({ donated: 0, received: 0 });
  const [userData, setUserData] = useState(null);
  const [getReccentActivity, setReccentActivity] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [editValues, setEditValues] = useState({ generic_name: '', quantity: '' });
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  //const [nextKey, setNextKey] = useState(4); // Start after the last uniqueKey in the initial state
  //const [items, setItems] = useState([
    //{ uniqueKey: 1, id: 1, name: 'Napa Extra', qty: 11, expiry: '05 Dec 24' },
    //{ uniqueKey: 2, id: 2, name: 'Paracetamol', qty: 20, expiry: '10 Jan 25' },
   // { uniqueKey: 3, id: 3, name: 'Ibuprofen', qty: 15, expiry: '15 Feb 25' },
  //]);
  

 /* const [moreItems, setMoreItems] = useState([
    { id: 4, name: 'Amoxicillin', qty: 18, expiry: '12 Mar 25' },
    { id: 5, name: 'Cefuroxime', qty: 12, expiry: '05 Apr 25' },
    { id: 6, name: 'Azithromycin', qty: 10, expiry: '22 May 25' },
  ]); */

  const [editingItemId, setEditingItemId] = useState(null);
  //const [editValues, setEditValues] = useState({ id: '', name: '', qty: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for email:", email); // Add logging
  
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userDashboard/getDashboardData`, { email });
        if (response.data.success) {
          setUserData(response.data.data);
        }
  
        const donationsResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userDashboard/donationsData`, { email });
        if (donationsResponse.data.success) {
          setDonationsData(prevData => ({
            ...prevData,
            donated: donationsResponse.data.data.donated,
            received: donationsResponse.data.data.received
          }));
          console.log("Donations Data: ", donationsResponse.data.data);
        }
  
        const availableMedicinesResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userDashboard/getAvailableMedicinesData`, { email });
        if (availableMedicinesResponse.data.success) {
          const availableData = availableMedicinesResponse.data.data;
          setDonationsData(prevData => ({
            ...prevData,
            totalAvailable: [availableData.December, availableData.January, availableData.February]
          }));
        }
  
        const monthlyReceivedResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userDashboard/getMonthlyReceivedData`, { email });
        if (monthlyReceivedResponse.data.success) {
          const receivedData = monthlyReceivedResponse.data.data;
          setDonationsData(prevData => ({
            ...prevData,
            totalReceived: [receivedData.December, receivedData.January, receivedData.February]
          }));
        }
  
        setLoading(true);
        const inventoryResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userDashboard/loadInventoryItems`, { email, offset: 0, limit: 3 });
        if (inventoryResponse.data.success) {
          setInventory(inventoryResponse.data.data);
          setOffset(3);
          setHasMore(inventoryResponse.data.data.length === 3);
          console.log("Inventory Data: ", inventoryResponse.data.data);
        } else {
          console.log('No inventory found for the user.');
          setHasMore(false);
        }
  
        const getReccentActivityResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userDashboard/getReccentActivity`, { email });
        console.log("Recent Activity Response:", getReccentActivityResponse);
        if (getReccentActivityResponse.data.success) {
          setReccentActivity(getReccentActivityResponse.data.data);
        } else {
          console.log('No recent activity found.');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (email) {
      fetchData();
    } else {
      console.error("Email is undefined");
    }
  }, [email]);
  
  useEffect(() => {
    if (getReccentActivity.length > 0) {
      console.log("Fetched recent activity:", getReccentActivity);
    }
  }, [getReccentActivity]);
  
  const handleLoadMore = async () => {
    try {
      console.log("Loading more inventory items for email:", email); // Add logging
  
      const inventoryResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userDashboard/loadInventoryItems`, {
        email,
        offset,
        limit: 3,
      });
  
      if (inventoryResponse.data.success) {
        setInventory(prevInventory => [...prevInventory, ...inventoryResponse.data.data]);
        setOffset(prevOffset => prevOffset + 3);
        setHasMore(inventoryResponse.data.data.length === 3);
        console.log("Loaded more inventory items:", inventoryResponse.data.data); // Add logging
      } else {
        console.log('No more inventory items to load.');
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more inventory items:", error);
    }
  };
  
  
  //const handleEdit = (item) => {
    //setEditingItemId(item.med_id); // Set the item as being edited
    //setEditValues({ generic_name: item.generic_name, quantity: item.quantity }); // Populate fields with current values
  //};
  
  
  const handleSave = async (med_id) => {
    console.log('Saving item with data:', {
      email,
      med_id,  // This should be a valid number (int8)
      generic_name: editValues.generic_name,
      quantity: editValues.quantity
    });
  
    // Ensure med_id is valid (not NaN or undefined)
    if (!med_id || isNaN(med_id)) {
      console.error('Invalid med_id:', med_id);  // Log error if med_id is invalid
      return;
    }
  
    try {
      // Optimistic UI update
      setInventory(prevInventory =>
        prevInventory.map(item =>
          item.med_id === med_id
            ? { ...item, generic_name: editValues.generic_name, quantity: editValues.quantity }
            : item
        )
      );
  
      setEditingItemId(null);  // Close the edit form
  
      //const response = await axios.put("http://localhost:5000/api/userDashboard/updateInventoryItem", {
        //email,
        //med_id: Number(med_id),  // Ensure med_id is passed as a number
        //generic_name: editValues.generic_name,
        //quantity: editValues.quantity
      //});
  
      console.log('Response from backend:', response);
  
      if (response.data.success) {
        // Optionally refetch the inventory after saving
        const inventoryResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/userDashboard/loadInventoryItems`, {
          email,
          offset: 0,
          limit: 3
        });
        if (inventoryResponse.data.success) {
          setInventory(inventoryResponse.data.data);
        }
      } else {
        alert("Failed to save item");
      }
    } catch (error) {
      console.error("Error saving inventory item:", error);
      alert("Error saving item, please try again.");
    }
  };
  
  
  
  


  
  
  
  
  
  //const handleDelete = (uniqueKey) => {
    //setItems(items.filter(item => item.uniqueKey !== uniqueKey));
  //};
  

  const handleCancel = () => {
    setEditingItemId(null); // Close the edit form
  };
  
  

  // Data for the Chart
  const data = {
    labels: ['December', 'January', 'February'],
    datasets: [
      {
        label: 'Uploads',
        data: donationsData.totalAvailable,
        backgroundColor: '#ff6b6b',
        borderColor: '#ff6b6b',
        borderRadius: 5,
      },
      {
        label: 'Received',
        data: donationsData.totalReceived,
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
        <div className="sidebar">
          <div className="profile">
            <img src={userData?.image_url || "https://via.placeholder.com/80"} alt="Profile" />
            <h2>{userData?.username} {userData?.last_name}</h2>
            <p>{userData?.email}</p>
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
              <h3>{donationsData.donated}</h3>
              <p>Donated</p>
            </div>
            <div className="dashboard-card received">
              <img src={parcelIcon} alt="Parcel Icon" className="parcel-icon" />
              <h3>{donationsData.received}</h3>
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
                    {getReccentActivity.length > 0 ? (
                      getReccentActivity.map((activity) => (
                        <tr key={activity.id || activity.name + activity.date}>
                          <td>{activity.name}</td>
                          <td>{activity.action}</td>
                          <td>{activity.status}</td>
                          <td>{activity.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No recent activity available.</td>
                      </tr>
                    )}
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
              {loading ? (
                <p>Loading inventory...</p>
              ) : inventory.length === 0 ? (
                <p>No inventory items found.</p>
              ) : (
                inventory.map((item) => (
                  <div key={item.med_id} className="item">
                    {editingItemId === item.med_id ? (
                      <div>
                        <input 
                          type="text" 
                          name="generic_name" 
                          value={editValues.generic_name} 
                          onChange={(e) => setEditValues({...editValues, generic_name: e.target.value})}
                        />
                        <input 
                          type="number" 
                          name="quantity" 
                          value={editValues.quantity} 
                          onChange={(e) => setEditValues({...editValues, quantity: e.target.value})}
                        />
                        <button onClick={() => handleSave(item.med_id)}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <span>{item.generic_name}</span>
                        <p>Qty: {item.quantity}</p>
                        <p>Expiry: {item.expiry_date}</p>
                        <div className="button-group">

                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Load More Button */}
            {hasMore && !loading && (
              <button className="load-more2" onClick={handleLoadMore}>
                Load More
              </button>
            )}

            {/* If no more items to load */}
            {!hasMore && inventory.length > 0 && !loading && <p>No more inventory items to load.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;