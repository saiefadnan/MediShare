const express =  require('express');
const multer = require('multer');
const { userRating, ratingChart, queryUsers, userDetails, storeUserinfo, queryAdmins, uploadImage, freqChart, pieChart, dataGrid, donationPie, collectionPie, comparisonData, userData, editUser, fetchRating, updateUserinfo, dashCards, reviewCards, storeNotifs, fetchNotifs, fetchNavData} = require('../controllers/adminController');
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
router.post('/fetch-navdata', fetchNavData);
router.post('/chart=donators&collectors',freqChart);
router.post('/piechart', pieChart);
router.post('/datagrid',dataGrid);
router.post('/donation-pie',donationPie);
router.post('/collection-pie',collectionPie);
router.post('/comparison-data',comparisonData);
router.post('/user-data',userData);
router.post('/fetch-rating',fetchRating);
router.post('/update-userinfo', updateUserinfo);
router.post('/dashcards',dashCards);
router.post('/reviewcards',reviewCards);
router.post('/fetch-notifs',fetchNotifs);


module.exports = router;
