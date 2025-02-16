const express=require('express');
const multer=require('multer');
const path=require('path');
const upload=multer();
const router=express.Router();

const {search,request,filterSearch,getLocation}=require('../controllers/searchControllers.js');

router.get('/getLocation',getLocation);
router.get('/searchMedicine',search);
router.get('/searchFilteredMedicine',filterSearch);
router.post('/requestSubmission',upload.single('file'),request);
module.exports = router;