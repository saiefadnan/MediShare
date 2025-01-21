const express = require('express')
const router = express.Router()

const { donateMedicine } = require('../controllers/donationController')

router.post('/donate-medicine', donateMedicine)

module.exports = router