const express = require('express')
const router = express.Router()
const multer = require('multer');

const { donateMedicine } = require('../controllers/donationController')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Modify route to accept file uploads
router.post('/donate-medicine', upload.single('medicineImage'), donateMedicine);
//router.post('/donate-medicine', donateMedicine)

module.exports = router