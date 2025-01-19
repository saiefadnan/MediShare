const express =  require('express');
const { userRating, ratingChart } = require('../controllers/adminController');
const router = express.Router();


router.post('/user-rating',userRating);
router.post('/rating-chart',ratingChart);

module.exports = router;




// userRating url: localhost:5000/api/admin/user-rating