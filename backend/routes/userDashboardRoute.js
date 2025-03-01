const express = require('express');
const router = express.Router();
const { getDashboardData, loadInventoryItems, donationsData, getMonthlyReceivedData, getAvailableMedicinesData, getReccentActivity, updateInventoryItem } = require('../controllers/userDashboardController');

router.post('/getDashboardData', getDashboardData);
router.post('/loadInventoryItems', loadInventoryItems);
router.post('/donationsData', donationsData);
router.put('/updateInventoryItem', updateInventoryItem);
router.post('/getMonthlyReceivedData', getMonthlyReceivedData);
router.post('/getAvailableMedicinesData', getAvailableMedicinesData);
router.post('/getReccentActivity', getReccentActivity);
module.exports = router;
