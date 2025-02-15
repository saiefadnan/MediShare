const express =  require('express');
const multer = require('multer');
const { userRating, ratingChart, queryUsers, userDetails, storeUserinfo, queryAdmins, uploadImage, fetchImage, freqChart, pieChart, dataGrid, donationPie, collectionPie, comparisonData, userData, editUser, fetchRating} = require('../controllers/adminController');
const { route } = require('./userRoute');
const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });



router.post('/user-rating',userRating);
router.post('/rating-chart',ratingChart);
router.post('/query-users',queryUsers);
router.post('/userinfo', userDetails);
router.post('/save-userinfo', storeUserinfo);
router.post('/query-admins', queryAdmins);
router.post('/image-upload', upload.single('image'), uploadImage);
router.post('/fetch-image', fetchImage);
router.post('/chart=donators&collectors',freqChart);
router.post('/piechart', pieChart);
router.post('/datagrid',dataGrid);
router.post('/donation-pie',donationPie);
router.post('/collection-pie',collectionPie);
router.post('/comparison-data',comparisonData);
router.post('/user-data',userData);
router.post('/fetch-rating',fetchRating);

module.exports = router;




// userRating url: localhost:5000/api/admin/user-rating