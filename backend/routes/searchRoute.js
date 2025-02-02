const express=require('express');
const multer=require('multer');
const path=require('path');
const upload=multer();
const router=express.Router();

const {search,request,filterSearch}=require('../controllers/searchControllers.js');

router.get('/searchMedicine',search);
router.get('/searchFilteredMedicine',filterSearch);
router.post('/requestSubmission',upload.single('file'),request);
module.exports = router;