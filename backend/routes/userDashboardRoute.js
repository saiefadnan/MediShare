const express = require('express');
const router = express.Router();
const { getDashboardData, loadInventoryItems, donationsData, getMonthlyReceivedData, getAvailableMedicinesData, getReccentActivity, updateInventoryItem } = require('../controllers/userDashboardController');

router.post('/dashboardData', getDashboardData);
router.post('/loadInventoryItems', loadInventoryItems);
router.post('/donationsData', donationsData);
router.put('/updateInventoryItem', updateInventoryItem);
router.post('/monthlyReceivedData', getMonthlyReceivedData);
router.post('/availableMedicinesData', getAvailableMedicinesData);
router.post('/reccentActivity', getReccentActivity);
module.exports = router;
