const multer = require('multer');
const supabase = require('../config/supabase.js');
const path = require('path');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getProfile = async (req, res) => {
  const { email } = req.body;

  try {
    
    const { data: userProfile, error: userProfileError } = await supabase
      .from('updateprofile') 
      .select('first_name, last_name, contact_number, address_line_1, address_line_2, division, zip_code, email, profile_picture_url') // Added profile_picture_url
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
      data: profile, 
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
  const { email, firstName, lastName, contactNumber, addressLine1, addressLine2, division, zipCode, userId } = req.body;
  const profilePicture = req.file; 
  
  try {
    
    const { data: userInfo, error: userInfoError } = await supabase
      .from('userInfo')
      .select('email')
      .eq('email', email)
      .single(); 
    
    if (userInfoError) {
      console.error('Error fetching user info:', userInfoError);
      return res.status(500).json({ success: false, message: 'Error fetching user info.' });
    }

    
    let publicUrl = ''; 
    
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

    
    const { data: updatedData, error: updateError } = await supabase
      .from('updateprofile')
      .upsert([{
        email,
        first_name: firstName,
        last_name: lastName,
        contact_number: contactNumber,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        division,
        zip_code: zipCode,
        profile_picture_url: publicUrl, 
        id: userId
      }]);

    if (updateError) {
      console.error('Error saving profile data:', updateError);
      return res.status(500).json({ success: false, message: 'Error updating profile.' });
    }

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
};



module.exports = {
  getProfile,
  updateProfile,
  upload  
};
