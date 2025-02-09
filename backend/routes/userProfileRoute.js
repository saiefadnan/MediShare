const express = require('express');
const router = express.Router();
const { updateProfile, upload } = require('../controllers/userProfileController');


router.put('/profile', upload.single('profilePicture'), updateProfile); 

module.exports = router;
