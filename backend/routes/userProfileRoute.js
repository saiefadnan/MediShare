const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, upload } = require('../controllers/userProfileController');

router.post('/getProfile', getProfile);
router.put('/profile', upload.single('profilePicture'), updateProfile); 

module.exports = router;
