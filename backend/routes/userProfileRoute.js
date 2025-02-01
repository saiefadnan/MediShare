const express = require('express');
const router = express.Router();
const { updateProfile, upload } = require('../controllers/userProfileController');

// Middleware to handle file uploads
router.put('/profile', upload.single('profilePicture'), updateProfile); // Handle the file upload with 'profilePicture'

module.exports = router;
