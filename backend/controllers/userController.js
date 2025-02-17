const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const supabase = require('../config/supabase.js')
const transporter = require('../config/mail.js')

const generatePassword = () => {
  const length = 10
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return password
}

const signup = async (req, res) => {
  const { username, email, gateway, image_url } = req.body
  var password = req.body.password
  const user = await supabase
    .from('userInfo')
    .select('*')
    .eq('email', email)
    .single()

  if (user.data) {
    if (gateway === 'google') {
      return res
        .status(200)
        .json({ success: true, message: 'Login successful', user: user.data })
    }
    return res
      .status(400)
      .json({ success: false, message: 'User already exists with this email' })
  }

  if (password == null) {
    password = generatePassword()
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const { data, error } = await supabase
      .from('userInfo')
      .insert([{ username, email, password: hashedPassword, image_url }])
      .select('*')
      .single()
    console.log(data)

    if (error) throw error
    res
      .status(201)
      .json({
        success: true,
        message: 'User registered successfully',
        user: data,
      })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const { data, error } = await supabase
      .from('userInfo')
      .select('*')
      .eq('email', email)
      .single()

    if (error) throw error

    const isValidPassword = await bcrypt.compare(password, data.password)
    if (isValidPassword) {
      res
        .status(200)
        .json({ success: true, message: 'Login successful', user: data })
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await supabase
    .from('userInfo')
    .select('id, email, username')
    .eq('email', email)
    .single()

  if (!user.data) {
    return res
      .status(404)
      .json({ success: false, message: 'User not found with this email' })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
  const resetUrl = `http://localhost:3000/reset-password/${token}`

  try {
    await supabase
      .from('reset_password')
      .insert([{ email, token, expires_at: expiresAt }])

    const sent = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    })
    console.log('Email sent: %s', sent.messageId)

    res
      .status(200)
      .json({
        success: true,
        message: 'Password reset link has been sent to your email',
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message })
  }
}

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body
  const reset = await supabase
    .from('reset_password')
    .select('*')
    .eq('token', token)
    .single()

  if (!reset.data) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid or expired token' })
  }

  if (new Date(reset.data.expires_at) < new Date()) {
    return res.status(400).json({ message: 'Token expired' })
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  try {
    await supabase
      .from('userInfo')
      .update({ password: hashedPassword })
      .eq('email', reset.data.email)

    await supabase.from('reset_password').delete().eq('token', token)

    res
      .status(200)
      .json({ success: true, message: 'Password reset successful' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const ai = async (req, res) => {
  try {
    const { searchQuery } = req.body
    console.log('message:', searchQuery)
    const apiKey = process.env.GEMINI_API_KEY

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: searchQuery }] }],
        }),
      }
    )

    const data = await response.json()
    console.log('data:', data)
    const responseText =
      data?.candidates?.length > 0
        ? data.candidates[0]?.content?.parts?.map((part) => part.text).join(' ')
        : 'No response'

    res.json({ response: responseText })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const test = async (req, res) => {
  try {
    const { data, error } = await supabase.from('userInfo').select('*')

    if (error) throw error
    console.log(data)
    res.json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  ai,
  test,
}
