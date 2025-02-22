const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, upload, getSidebarProfileData, getUserProfileData } = require('../controllers/userProfileController');
//const { get } = require('../config/mail');

router.get('/getProfile', getProfile); 
//router.get('/getUserProfileData', getProfile);
router.post('/getUserProfileData', getUserProfileData);
router.put('/profile', upload.single('profilePicture'), updateProfile); 
router.post('/getSidebarProfileData', getSidebarProfileData);
module.exports = router;
