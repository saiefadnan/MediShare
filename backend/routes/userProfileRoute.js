const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getProfile, updateProfile, getSidebarProfileData, getUserProfileData } = require('../controllers/userProfileController');
//const { get } = require('../config/mail');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getProfile', getProfile); 
//router.get('/getUserProfileData', getProfile);
router.post('/getUserProfileData', getUserProfileData);
router.put('/profile', upload.single('profilePicture'), updateProfile); 
router.post('/getSidebarProfileData', getSidebarProfileData);
module.exports = router;
