const supabase = require('../config/supabase.js'); 
//const upload  = require('../middlewares/multer'); // If you are handling image upload
//const path = require('path');


const getDashboardData = async (req, res) => {
  const { email } = req.body; 
  console.log("Email received: ", email);
  try {
   
    const { data: userProfile, error: userProfileError } = await supabase
      .from('updateprofile')
      .select('first_name, last_name, contact_number, address_line_1, address_line_2, division, zip_code, email, profile_picture_url')
      .eq('email', email);

    if (userProfileError) {
      console.error('Error fetching user profile:', userProfileError);
      return res.status(500).json({ success: false, message: 'Error fetching user profile.' });
    }

    if (userProfile.length === 0) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }

    res.status(200).json({ success: true, data: userProfile[0] });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


/* const loadInventoryItems = async (req, res) => {
  const { email } = req.body; 

  try {
    
    const { data: inventoryItems, error: inventoryError } = await supabase
      .from('medicine')
      .select('med_id, common_name, quantity, expiry_date')
      .eq('donor_id', email); 

    if (inventoryError) {
      console.error('Error fetching inventory items:', inventoryError);
      return res.status(500).json({ success: false, message: 'Error fetching inventory items.' });
    }

    res.status(200).json({ success: true, data: inventoryItems });
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}; */




const donationsData = async (req, res) => {
    const { email } = req.body;  
    console.log("Email in backend:", email);  
  
    try {
     
      const { data: userData, error: userError } = await supabase
        .from('userInfo') 
        .select('id')
        .eq('email', email)  
        .single();  
  
      if (userError) {
        console.error('Error fetching user ID:', userError); 
        return res.status(500).json({ success: false, message: 'Error fetching user ID: ' + userError.message });
      }
  
      if (!userData) {
        console.log("User data not found");
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const userId = userData.id;  
      console.log("User ID fetched:", userId);  
  
      
      const { data: userDonatedItems, error: donatedError } = await supabase
        .from('medicine_request')
        .select('status')
        .eq('donor_id', userId)  
        .eq('status', 'accepted');  
  
      console.log('User Donated Items:', userDonatedItems); 
  
      if (donatedError) {
        console.error('Error fetching donation data:', donatedError);  
        return res.status(500).json({ success: false, message: 'Error fetching donation data: ' + donatedError.message });
      }
  
      
      const { data: userReceivedItems, error: receivedError } = await supabase
        .from('medicine_request')
        .select('status')
        .eq('requester_id', userId)  
        .eq('status', 'accepted'); 
  
      console.log('User Received Items:', userReceivedItems);  
  
      if (receivedError) {
        console.error('Error fetching received data:', receivedError);  
        return res.status(500).json({ success: false, message: 'Error fetching received data: ' + receivedError.message });
      }
  
      
      const userDonatedCount = userDonatedItems ? userDonatedItems.length : 0;  
      const userReceivedCount = userReceivedItems ? userReceivedItems.length : 0;  
  
      
      res.status(200).json({ success: true, data: { donated: userDonatedCount, received: userReceivedCount } });
  
    } catch (error) {
      console.error('Error fetching donation data:', error);  
      res.status(500).json({ success: false, message: 'General error: ' + error.message });
    }
  };




  const getMonthlyReceivedData = async (req, res) => {
    try {
      
      const { data: allReceivedItems, error: allReceivedError } = await supabase
        .from('medicine_request')
        .select('created_at')
        .eq('status', 'accepted');  
      
      if (allReceivedError) {
        return res.status(500).json({ success: false, message: allReceivedError.message });
      }
      

        // Fetch available medicines from the medicine table
    const { data: availableMedicines, error: availableMedicinesError } = await supabase
    .from('medicine')
    .select('created_at')
    .eq('status', 'available');  // Filter for available medicines

  if (availableMedicinesError) {
    return res.status(500).json({ success: false, message: availableMedicinesError.message });
  }
      
      const monthCounts = { December: 0, January: 0, February: 0 };
      
      allReceivedItems.forEach(item => {
        const month = new Date(item.created_at).toLocaleString('default', { month: 'long' });
        if (month === 'December') {
          monthCounts.December += 1;
        } else if (month === 'January') {
          monthCounts.January += 1;
        } else if (month === 'February') {
          monthCounts.February += 1;
        }
      });
      
  
      res.status(200).json({ success: true, data: monthCounts });
    } catch (error) {
      console.error('Error fetching monthly received data:', error);
      res.status(500).json({ success: false, message: error.message });
    }
};


const getAvailableMedicinesData = async (req, res) => {
    try {
      // Fetch available medicines from the 'medicine' table with their status 'available'
      const { data: availableMedicines, error: availableMedicinesError } = await supabase
        .from('medicine')
        .select('created_at, status') // Only selecting created_at and status
        .eq('status', 'available');  // Filter for available medicines
      
      if (availableMedicinesError) {
        return res.status(500).json({ success: false, message: availableMedicinesError.message });
      }
      
      // Prepare data for the graph, grouping the medicines by month
      const monthCounts = { December: 0, January: 0, February: 0 };
      
      availableMedicines.forEach(item => {
        const month = new Date(item.created_at).toLocaleString('default', { month: 'long' });
        if (month === 'December') {
          monthCounts.December += 1;
        } else if (month === 'January') {
          monthCounts.January += 1;
        } else if (month === 'February') {
          monthCounts.February += 1;
        }
      });
  
      // Send the response with the counts of available medicines by month
      res.status(200).json({ success: true, data: monthCounts });
    } catch (error) {
      console.error('Error fetching available medicines data:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  


  
  

module.exports = {
  getDashboardData,
  /*loadInventoryItems, */
  donationsData,
  getMonthlyReceivedData,
  getAvailableMedicinesData

};
