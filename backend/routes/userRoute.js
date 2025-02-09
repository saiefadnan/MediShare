const express = require('express')
const router = express.Router()
const passport = require('passport')
const {
  login,
  signup,
  forgotPassword,
  resetPassword,
  test,
} = require('../controllers/userController')

router.post('/signup', signup)
router.post('/login', login)
router.get('/test-supabase', test)
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
)
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/auth/google/callback',
    failureRedirect: '/google/failed',
    failureFlash: true,
  })
)
router.get('/google/failed', (req, res) => {
  res.status(401).json({ success: false, message: 'Login failed' })
})
router.get('/google/success', (req, res) => {
  if (req.user) {
    const userData = {
      id: req.user.id,
      email: req.user.emails[0].value,
      username: req.user.displayName,
      image_url: req.user.photos[0].value,
    }
    console.log('userData: ', userData)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userData,
    })
  } else {
    res.status(401).json({
      success: false,
      message: 'No user data available',
    })
  }
})
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('http://localhost:3000')
})
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

module.exports = router
