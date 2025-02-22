const supabase = require('../config/supabase.js');

// Fetch all requested medicines made by the logged-in user (i.e., donor)
const getUserRequestedData = async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Received email:', email);  // Log received email

    // Fetch userId and image_url from the userInfo table
    const { data: userData, error: userError } = await supabase
      .from('userInfo')
      .select('id, image_url') // Select both id and image_url
      .eq('email', email)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const userId = userData.id;
    const profilePic = userData.image_url; // Get the profile picture URL
    console.log('Fetched userId:', userId); 
    console.log('Fetched profilePic:', profilePic); // Log the profile picture URL

    // Fetch all requests made by the logged-in user (as a requester)
    const { data: userRequested, error: requestsError } = await supabase
      .from('medicine_request')
      .select(`
        request_id, 
        created_at, 
        requester_id, 
        med_id,
        quantity,
        prescription_image,
        status,
        donor_id 
      `)
      .eq('requester_id', userId)  // Ensure it's for the logged-in user
      .order('created_at', { ascending: false });  // Order by creation date

    if (requestsError) {
      console.error('Error fetching requests:', requestsError);
      return res.status(500).json({ success: false, message: 'Error fetching requests data.' });
    }

    // If no requests are found, return empty data
    if (!userRequested || userRequested.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Now, fetch the donor's usernames (donor_id) and the common names of the medicines (med_id)
    const donorIds = userRequested.map(request => request.donor_id); // Donor IDs
    const medIds = userRequested.map(request => request.med_id); // Medicine IDs

    // Fetch donor's usernames based on donor_id
    const { data: donorData, error: donorError } = await supabase
      .from('userInfo')
      .select('id, username, contact_number')
      .in('id', donorIds);

    if (donorError) {
      console.error('Error fetching donor data:', donorError);
      return res.status(500).json({ success: false, message: 'Error fetching donor data.' });
    }

    // Fetch medicine details based on med_id
    const { data: medicineData, error: medicineError } = await supabase
      .from('medicine')
      .select('med_id, common_name')
      .in('med_id', medIds);

    if (medicineError) {
      console.error('Error fetching medicine data:', medicineError);
      return res.status(500).json({ success: false, message: 'Error fetching medicine data.' });
    }

    // Format the data for the frontend (Requested from, Medicine, Type, Status)
      const formattedRequests = userRequested.map(request => {
      const donor = donorData.find(user => user.id === request.donor_id);
      const medicine = medicineData.find(med => med.med_id === request.med_id);
      const contactNumber = request.status === "accepted" ? donor?.contact_number : "---";
      return {
        request_id: request.request_id,
        requestedFrom: donor ? donor.username : 'Unknown', // Donor's username
        medicine: medicine ? medicine.common_name : 'Unknown', // Medicine common name
        type: medicine ? medicine.common_name : 'Unknown',  // Use common_name as Type
        quantity: request.quantity,
        date: new Date(request.created_at).toLocaleDateString('en-GB'),
        status: request.status,
        profilePic: profilePic,  // Profile picture of the logged-in user (donor)
        prescriptionImage: request.prescription_image,  // Prescription image
        contact: contactNumber,  // Contact number of the requester
      };
    });

    res.status(200).json({ success: true, data: formattedRequests, profilePic: profilePic }); // Return formatted data

  } catch (error) {
    console.error('Error fetching requested data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch the profile picture of the logged-in user
const getProfilePic = async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Received email:', email);  // Log received email

    // Fetch image_url (Profile Picture) from the userInfo table
    const { data: userData, error: userError } = await supabase
      .from('userInfo')
      .select('image_url') // Select only image_url (profile picture)
      .eq('email', email)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const profilePic = userData.image_url; // Get the profile picture URL
    console.log('Fetched profilePic:', profilePic); // Log the profile picture URL

    res.status(200).json({ success: true, profilePic }); // Return the profile picture URL

  } catch (error) {
    console.error('Error fetching profile picture:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching the profile picture.' });
  }
};

module.exports = {
  getUserRequestedData,
  getProfilePic
};
