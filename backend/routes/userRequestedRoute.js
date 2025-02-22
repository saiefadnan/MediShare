const express = require('express');
const router = express.Router();
const { getUserRequestedData, getProfilePic } = require('../controllers/userRequestedController');

// Route to fetch profile picture of the logged-in user
router.post('/getProfilePic', getProfilePic);

// Route to fetch all user requests made by the logged-in user (i.e., the requester)
router.post('/getUserRequestedData', getUserRequestedData);

module.exports = router;
