const supabase = require('../config/supabase.js');

// Fetch all incoming requests for the logged-in user (i.e., donor)
const getUserRequestsData = async (req, res) => {
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

    const { data: userRequests, error: requestsError } = await supabase
      .from('medicine_request')
      .select(`
        request_id, 
        created_at, 
        requester_id, 
        med_id,
        quantity,
        prescription_image,
        status
      `)
      .eq('donor_id', userId)  // Ensure it's for the logged-in user
      .order('created_at', { ascending: false });  // Fetch all statuses, including accepted/rejected

    if (requestsError) {
      console.error('Error fetching requests:', requestsError);
      return res.status(500).json({ success: false, message: 'Error fetching requests data.' });
    }

    // If no requests are found, return empty data
    if (!userRequests || userRequests.length === 0) {
      console.log('No requests found for the user.');
      return res.status(200).json({ success: true, data: [] });
    }

    // Now, fetch the usernames from 'userInfo' for all the requester_ids
    const requesterIds = userRequests.map(request => request.requester_id);
    console.log('Fetching usernames for requesterIds:', requesterIds);  // Log requesterIds

    const { data: requesterData, error: requesterError } = await supabase
      .from('userInfo')
      .select('id, username')
      .in('id', requesterIds);  // Fetch multiple users' data by matching the requester's IDs

    if (requesterError) {
      console.error('Error fetching requester data:', requesterError);
      return res.status(500).json({ success: false, message: 'Error fetching requester data.' });
    }

    console.log('Fetched requesterData:', requesterData);  // Log requester data

    // Fetch the medicine information based on the med_id
    const medIds = userRequests.map(request => request.med_id);
    console.log('Fetching medicine data for medIds:', medIds);  // Log medIds

    const { data: medicineData, error: medicineError } = await supabase
      .from('medicine')
      .select('med_id, generic_name')
      .in('med_id', medIds);  // Fetch multiple medicines' data by matching the med_id

    if (medicineError) {
      console.error('Error fetching medicine data:', medicineError);
      return res.status(500).json({ success: false, message: 'Error fetching medicine data.' });
    }

    console.log('Fetched medicineData:', medicineData);  // Log medicine data

    // Format the data to return the necessary columns (Requested by, Type, Quantity, Date)
    const formattedRequests = userRequests.map(request => {
      const requester = requesterData.find(user => user.id === request.requester_id);
      const medicine = medicineData.find(med => med.med_id === request.med_id);

      return {
        request_id: request.request_id,
        requestedBy: requester ? requester.username : 'Unknown', // Handle case where requester is not found
        type: medicine ? medicine.generic_name : 'Unknown', // Handle case where medicine is not found
        quantity: request.quantity,  // Add the quantity from the medicine_request table
        date: new Date(request.created_at).toLocaleDateString('en-GB'),
        profilePic: profilePic, // Include the profilePic in the response
        prescriptionImage: request.prescription_image, // Include the prescription image in the response
        status: request.status // Include the status of the request
      };
    });

    res.status(200).json({ success: true, data: formattedRequests, profilePic: profilePic }); // Return the formatted data
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update the request status to "accepted" or "rejected"
const updateRequestStatus = async (req, res) => {
  const { request_id, status } = req.body; // Receive the request_id and new status from the request body

  // Validate the status value
  if (status !== 'accepted' && status !== 'rejected') {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  // Validate the request_id
  if (!request_id) {
    return res.status(400).json({ success: false, message: 'Request ID is required' });
  }

  try {
    // Check if the request_id exists in the database
    const { data: request, error: findError } = await supabase
      .from('medicine_request')
      .select('request_id')
      .eq('request_id', request_id)
      .single();

    // Log the fetched request_id for debugging
    console.log('Fetched request_id:', request_id);  // Log the request_id from the input

    if (findError || !request) {
      console.error('Request not found or error:', findError);
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Update the status and set showButtons to false to hide the buttons after acceptance or rejection
    const { data, error: updateError } = await supabase
      .from('medicine_request')
      .update({ status, showbuttons: false }) // Set showButtons to false
      .eq('request_id', request_id)
      .single();

    if (updateError) {
      console.error('Error updating request status:', updateError);  // Log the full error object from Supabase
      return res.status(500).json({ success: false, message: 'Error updating request status.', error: updateError });
    }

    console.log('Successfully updated request status:', data);

    // Return a success response
    res.status(200).json({ success: true, message: `Request has been ${status === 'accepted' ? 'accepted' : 'rejected'}` });
  } catch (error) {
    console.error('Error handling status update:', error);
    res.status(500).json({ success: false, message: 'Error handling status update.' });
  }
};

module.exports = {
  getUserRequestsData,
  updateRequestStatus
};
