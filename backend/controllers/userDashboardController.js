const supabase = require('../config/supabase.js'); 
//const upload  = require('../middlewares/multer'); // If you are handling image upload
const path = require('path');


const getDashboardData = async (req, res) => {
  console.log('getDashboardData called');

  const { email } = req.body; 
  console.log("Email received: ", email);
  try {
    const { data: userProfile, error: userProfileError } = await supabase
      .from('userInfo')  // Changed from 'updateprofile' to 'userInfo'
      .select('username, last_name, contact_number, address_line_1, address_line_2, division, zip_code, email, image_url')  // Updated column names
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



const donationsData = async (req, res) => {
  console.log('donationsData called');

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
    console.log('getMonthlyReceivedData called');

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
   console.log('getAvailableMedicinesData called');

    try {
      
      const { data: availableMedicines, error: availableMedicinesError } = await supabase
        .from('medicine')
        .select('created_at, status') 
        .eq('status', 'available');  
      if (availableMedicinesError) {
        return res.status(500).json({ success: false, message: availableMedicinesError.message });
      }
      
      
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
  
      
      res.status(200).json({ success: true, data: monthCounts });
    } catch (error) {
      console.error('Error fetching available medicines data:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };


  
  const getReccentActivity = async (req, res) => {
    console.log('getReccentActivity called');

    const { email } = req.body;

    try {
        // Fetch user ID
        const { data: userData, error: userError } = await supabase
            .from('userInfo')
            .select('id')
            .eq('email', email)
            .single();

        if (userError || !userData) {
            console.error('Error fetching user data:', userError || 'User not found');
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const userId = userData.id;

        // Fetch activity data where the user is either requester or donor
        const { data: activityData, error: activityError } = await supabase
            .from('medicine_request')
            .select('created_at, status, requester_id, donor_id')
            .or(`requester_id.eq.${userId},donor_id.eq.${userId}`)
            .eq('status', 'accepted')
            .order('created_at', { ascending: false });

        if (activityError) {
            console.error('Error fetching activity data:', activityError);
            return res.status(500).json({ success: false, message: 'Error fetching activity data.' });
        }

        if (!activityData || activityData.length === 0) {
            console.log('No recent activity found for the user.');
            return res.status(404).json({ success: false, message: 'No recent activity found.' });
        }

        // Process the activity data for recent activities
        const recentActivity = await Promise.all(activityData.map(async (item) => {
            try {
                let action = '';
                let name = '';

                // If the user is the requester, fetch donor's name
                if (item.requester_id === userId) {
                    action = 'Receive';

                    const { data: donorData, error: donorError } = await supabase
                        .from('userInfo')
                        .select('username')
                        .eq('id', item.donor_id)
                        .single();

                    if (!donorError && donorData) {
                        name = donorData.username;
                    } else {
                        console.error('Error fetching donor data:', donorError);
                        return null;
                    }
                }

                // If the user is the donor, fetch requester's name
                else if (item.donor_id === userId) {
                    action = 'Donate';

                    const { data: requesterData, error: requesterError } = await supabase
                        .from('userInfo')
                        .select('username')
                        .eq('id', item.requester_id)
                        .single();

                    if (!requesterError && requesterData) {
                        name = requesterData.username;
                    } else {
                        console.error('Error fetching requester data:', requesterError);
                        return null;
                    }
                }

                return {
                    name: name,  // Display the other party's name
                    action: action,
                    status: 'Complete',
                    date: new Date(item.created_at).toLocaleDateString('en-GB'),
                };
            } catch (error) {
                console.error('Error processing activity data:', error);
                return null;
            }
        }));

        // Filter out null values (in case of errors fetching names)
        const filteredActivity = recentActivity.filter(activity => activity !== null);

        console.log('Filtered Recent Activity:', filteredActivity);
        res.status(200).json({ success: true, data: filteredActivity });
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const loadInventoryItems = async (req, res) => {
  console.log('loadInventoryItems called');

  const { email, offset = 0, limit = 3 } = req.body;  

  try {
    
    const { data: userData, error: userError } = await supabase
      .from('userInfo')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const userId = userData.id;

   
    const { data: inventoryItems, error: inventoryError } = await supabase
      .from('medicine')
      .select('generic_name, quantity, expiry_date')
      .eq('donor_id', userId)  // Get medicines uploaded by the user
      .range(offset, offset + limit - 1);  // Fetch items with pagination based on offset and limit

    if (inventoryError) {
      console.error('Error fetching inventory items:', inventoryError);
      return res.status(500).json({ success: false, message: 'Error fetching inventory items.' });
    }

    if (!inventoryItems.length) {
      return res.status(404).json({ success: false, message: 'No medicines found for this user.' });
    }

    
    res.status(200).json({ success: true, data: inventoryItems });
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({ success: false, message: 'Error fetching inventory items.' });
  }
};


const updateInventoryItem = async (req, res) => {
  const { email, med_id, generic_name, quantity } = req.body;

  if (!med_id || isNaN(med_id)) {
    console.error('Invalid med_id:', med_id);
    return res.status(400).json({ success: false, message: 'Invalid med_id provided.' });
  }

  try {
    const { data: userData, error: userError } = await supabase
      .from('userInfo')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      console.error('User not found or error fetching user:', userError);
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const userId = userData.id;

    const { data, error } = await supabase
      .from('medicine')
      .update({
        generic_name,
        quantity
      })
      .eq('med_id', med_id)  
      .eq('donor_id', userId);

    if (error) {
      console.error('Error updating inventory item:', error);
      return res.status(500).json({ success: false, message: 'Error updating inventory item.' });
    }

    console.log("Item updated successfully:", data);
    res.status(200).json({ success: true, message: 'Inventory item updated successfully.' });
  } catch (error) {
    console.error('Error in updateInventoryItem:', error);
    res.status(500).json({ success: false, message: 'General error: ' + error.message });
  }
};


  

module.exports = {
  getDashboardData,
  loadInventoryItems, 
  donationsData,
  getMonthlyReceivedData,
  getAvailableMedicinesData,
  getReccentActivity,
  updateInventoryItem

};
