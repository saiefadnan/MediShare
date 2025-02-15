const express = require('express');
const router = express.Router();
const { getDashboardData, /*loadInventoryItems, */ donationsData, getMonthlyReceivedData, getAvailableMedicinesData } = require('../controllers/userDashboardController');

router.post('/dashboardData', getDashboardData);
//router.post('/loadInventoryItems', loadInventoryItems);
router.post('/donationsData', donationsData);

router.post('/monthlyReceivedData', getMonthlyReceivedData);
router.post('/availableMedicinesData', getAvailableMedicinesData);
module.exports = router;
