const multer = require('multer');
const supabase = require('../config/supabase.js');
const path = require('path');
const { profile } = require('console');

// Set up Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload Profile Picture to Supabase Storage and Save URL
const updateProfile = async (req, res) => {
  const { firstName, lastName, email, contactNumber, addressLine1, addressLine2, division, zipCode,userId } = req.body;
  const profilePicture = req.file; // This is the uploaded image from the frontend
  
  // Log the data to check if everything is coming through correctly
  
  
  
  try {
    // Get the current profile picture URL (if any) from the database
    /*const { data: currentData, error: fetchError } = await supabase
      .from('updateprofile')
      .select('profile_picture_url')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.message !== 'PGRST116') {
      console.error('Error fetching current profile data:', fetchError);
      throw fetchError;
    }*/

    // If a profile picture exists, delete the old one from Supabase Storage
    /*if (currentData && currentData.profile_picture_url) {
      // Extract the file name from the current profile picture URL
      const oldFileName = path.basename(currentData.profile_picture_url); // Extract the file name from URL (e.g., 'profile-pictures/john_doe.jpg')
      console.log('Old file name:', oldFileName);
      
      // Remove the file from Supabase Storage
      const { error: deleteError } = await supabase
        .storage
        .from('profile-pictures')
        .remove([`profile-pictures/${oldFileName}`]);

      if (deleteError) {
        console.error('Error deleting old profile picture:', deleteError);
        throw deleteError;
      }
    }*/

    // If a profile picture is uploaded, upload to Supabase Storage
    if (profilePicture) {
      const fileName = `profile-pictures/${email}_${Date.now()}${path.extname(profilePicture.originalname)}`; // Unique file name
      const mimeType = profilePicture.mimetype; // Get MIME type (image/jpeg, image/png)

      // Upload the image to Supabase Storage
      const { data, error } = await supabase
        .storage
        .from('profile-pictures')  // Bucket name
        .upload(fileName, profilePicture.buffer, {
          cacheControl: '3600',
          upsert: true,
          contentType: mimeType // Set MIME type explicitly
        });
        console.log('Uploaded image data:', data);

      if (error) {
        console.error('Supabase upload error:', error);
        throw error;
      }

      // Get the public URL of the uploaded image
      const publicUrl = supabase
        .storage
        .from('profile-pictures')
        .getPublicUrl(fileName).data.publicUrl;

      console.log('Uploaded image public URL:', publicUrl);

      // Save the user's profile data along with the image URL in the 'updateprofile' table
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
          id:userId  // Save the URL to the profile picture
        }]);

      if (updateError) {
        console.error('Error saving profile data:', updateError);
        throw updateError;
      }

      res.status(200).json({
        success: true,
        message: "Profile updated successfully!",
        data: updatedData,  // Return the updated profile data
      });

    } else {
      // If no image is uploaded, update the rest of the profile data without the picture
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
          profile_picture_url: publicUrl, // Set the profile picture URL to null
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
  upload  // Make sure to export the multer upload middleware
};