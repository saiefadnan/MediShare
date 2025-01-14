const express =  require('express');
const router = express.Router();
const {
    login,
    signup,
    test
} = require('../controllers/userController');

router.post('/signup',signup);
router.post('/login',login);
router.get('/test-supabase',test);

module.exports = router;