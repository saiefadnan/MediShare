const express =  require('express');
const { userRating } = require('../controllers/adminController');
const router = express.Router();


router.post('/userRating',userRating);

module.exports = router;




// userRating url: localhost:5000/api/admin/userRating