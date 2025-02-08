const multer = require('multer');
const supabase = require('../config/supabase.js');
const path = require('path');
const { profile } = require('console');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const updateProfile = async (req, res) => {
  const { firstName, lastName, email, contactNumber, addressLine1, addressLine2, division, zipCode,userId } = req.body;
  const profilePicture = req.file; // This is the uploaded image
  
  
  
  
  try {
    

    
    if (profilePicture) {
      const fileName = `profile-pictures/${email}_${Date.now()}${path.extname(profilePicture.originalname)}`; 
      const mimeType = profilePicture.mimetype; 

      
      const { data, error } = await supabase
        .storage
        .from('profile-pictures')  
        .upload(fileName, profilePicture.buffer, {
          cacheControl: '3600',
          upsert: true,
          contentType: mimeType 
        });
        console.log('Uploaded image data:', data);

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

     
      const publicUrl = supabase
        .storage
        .from('profile-pictures')
        .getPublicUrl(fileName).data.publicUrl;

      console.log('Uploaded image public URL:', publicUrl);

      
      const { data: updatedData, error: updateError } = await supabase
        .from('updateprofile')
        .upsert([{
          email: email,
          first_name: firstName,
          last_name: lastName,
          contact_number: contactNumber,
          address_line_1: addressLine1,
          address_line_2: addressLine2,
          division: division,
          zip_code: zipCode,
          profile_picture_url: publicUrl,
          id:userId  
        }]);

      if (updateError) {
        console.error('Error saving profile data:', updateError);
        throw updateError;
      }

      res.status(200).json({
        success: true,
        message: "Profile updated successfully!",
        data: updatedData, 
      });

    } else {
     
      const { data: updatedData, error: updateError } = await supabase
        .from('updateprofile')
        .upsert([{
          email: email,
          first_name: firstName,
          last_name: lastName,
          contact_number: contactNumber,
          address_line_1: addressLine1,
          address_line_2: addressLine2,
          division: division,
          zip_code: zipCode,
          profile_picture_url: publicUrl, 
          id:userId 
        }]);

      if (updateError) {
        console.error('Error saving profile data without image:', updateError);
        throw updateError;
      }

      res.status(200).json({
        success: true,
        message: "Profile updated successfully without image.",
        data: updatedData,
      });
    }
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  updateProfile,
  upload  
};