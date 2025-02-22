const multer = require('multer');
const supabase = require('../config/supabase.js');
const path = require('path');
const bcrypt = require('bcrypt');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getSidebarProfileData = async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Received email:', email);  // Log received email

    // Fetch profile information (image_url, username, last_name) from the userInfo table
    const { data: userData, error: userError } = await supabase
      .from('userInfo')
      .select('image_url, username, last_name') // Select the necessary columns
      .eq('email', email)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const { image_url, username, last_name } = userData;

    // Return the profile data
    res.status(200).json({ success: true, profilePic: image_url, username, lastName: last_name });
  } catch (error) {
    console.error('Error fetching sidebar profile data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching the profile data.' });
  }
};




const getProfile = async (req, res) => {
  const { email } = req.body;

  try {
    const { data: userProfile, error: userProfileError } = await supabase
      .from('userInfo')
      .select('username, last_name, contact_number, address_line_1, address_line_2, division, zip_code, email, image_url')
      .eq('email', email);

    if (userProfileError) {
      console.error('Error fetching user profile:', userProfileError);
      throw userProfileError;
    }

    if (userProfile.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No profile found for this email.',
      });
    }

    const profile = userProfile[0];

    res.status(200).json({
      success: true,
      data: profile, // Profile data (including image_url)
    });
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};




const updateProfile = async (req, res) => {
  const { email, username, lastName, contactNumber, addressLine1, addressLine2, division, zipCode, userId } = req.body;
  const profilePicture = req.file;  // This is where the profile picture file will be stored.

  try {
    // Fetch user info based on email
    const { data: userInfo, error: userInfoError } = await supabase
      .from('userInfo')
      .select('email, password, id')  
      .eq('email', email)
      .single();

    if (userInfoError) {
      console.error('Error fetching user info:', userInfoError);
      return res.status(500).json({ success: false, message: 'Error fetching user info.' });
    }

    // Ensure required fields are provided
    if (!addressLine1 || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: 'Address Line 1 and Contact Number are required fields.'
      });
    }

    let publicUrl = ''; // Initialize the public URL for the profile picture

    // Handle profile picture upload if provided
    if (profilePicture) {
      const fileBuffer = profilePicture.buffer;
      const fileName = `profile-pictures/${email}_${Date.now()}${path.extname(profilePicture.originalname)}`;
      const mimeType = profilePicture.mimetype;

      const { data, error } = await supabase
        .storage
        .from('profile-pictures')
        .upload(fileName, fileBuffer, {
          cacheControl: '3600',
          upsert: true,
          contentType: mimeType,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        return res.status(500).json({ success: false, message: 'Error uploading profile picture.' });
      }

      publicUrl = supabase
        .storage
        .from('profile-pictures')
        .getPublicUrl(fileName).data.publicUrl;
    }

    // Prepare the data to be updated or inserted
    const updateData = {
      email,
      username: username || userInfo.username,  // Use existing username if not provided
      last_name: lastName || userInfo.last_name,
      contact_number: contactNumber || userInfo.contact_number,
      address_line_1: addressLine1 || userInfo.address_line_1,
      address_line_2: addressLine2 || userInfo.address_line_2,
      division: division || userInfo.division,
      zip_code: zipCode || userInfo.zip_code,
      image_url: publicUrl || userInfo.image_url,  // Update profile picture if uploaded
      id: userId || userInfo.id
    };

    // Upsert into the database (insert if new, update if existing)
    const { data: updatedData, error: updateError } = await supabase
      .from('userInfo')
      .upsert([updateData]);

    if (updateError) {
      console.error('Error saving profile data:', updateError);
      return res.status(500).json({ success: false, message: 'Error updating profile.' });
    }

    // Respond with updated data
    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: updatedData,
    });

  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }

  console.log("Received form data:", req.body);  
  console.log("Received file:", req.file);
};



const getUserProfileData = async (req, res) => {
  // Accessing the email from the request body
  const { email } = req.body;

  // Logging email to ensure it is received
  console.log('Received email:', email);

  try {
    if (!email) {
      // If email is not present in the request, return an error.
      return res.status(400).json({
        success: false,
        message: 'Email is required.',
      });
    }

    // Query the database using the email received in the request
    const { data: userData, error: userError } = await supabase
      .from('userInfo')
      .select('id, username, last_name, contact_number, address_line_1, address_line_2, division, zip_code, email, image_url')
      .eq('email', email)
      .single(); // Fetch single user data based on the email

    if (userError || !userData) {
      // If there's an error fetching user data, send a 404 response
      console.error('Error fetching user data:', userError);
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Destructure the user data
    const { id, username, last_name, contact_number, address_line_1, address_line_2, division, zip_code, image_url } = userData;

    // Send the response with user data
    res.status(200).json({
      success: true,
      data: {
        username,
        lastName: last_name,
        contactNumber: contact_number,
        addressLine1: address_line_1,
        addressLine2: address_line_2,
        division,
        zipCode: zip_code,
        email,
        profilePic: image_url, // Returning the profile picture URL
      },
    });

  } catch (error) {
    console.error('Error fetching user profile data:', error);
    // Return error response if an exception occurs
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching user profile data.',
    });
  }
};










module.exports = {
  getProfile,
  updateProfile,
  upload,
  getSidebarProfileData,
  getUserProfileData
};
