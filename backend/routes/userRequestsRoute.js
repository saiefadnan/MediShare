const express = require('express');
const router = express.Router();
const { getUserRequestsData, updateRequestStatus } = require('../controllers/userRequestController');

// Route to get user requests data
router.post('/getUserRequestsData', getUserRequestsData);

// Route to update request status (accepted/rejected)
router.put('/updateRequestStatus', updateRequestStatus);

module.exports = router;
