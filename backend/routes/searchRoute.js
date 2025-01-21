const express=require('express');
const router=express.Router();

const {search,filterSearch}=require('../controllers/searchControllers.js');

router.get('/searchMedicine',search);
router.get('/searchFilteredMedicine',filterSearch);
module.exports = router;