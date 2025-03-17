const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const session = require('express-session')
const passport = require('passport')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const passportSetup = require('./config/passport')

// Import routes
const user = require('./routes/userRoute')
const search = require('./routes/searchRoute')
const admin = require('./routes/adminRoute')
const donateMedicine = require('./routes/donationRoute')
const userProfileRoute = require('./routes/userProfileRoute')
const userDashboardRoutes = require('./routes/userDashboardRoute')
const userRequestRoute = require('./routes/userRequestsRoute')
const userRequestedRoutes = require('./routes/userRequestedRoute')

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
)

app.use(express.static('public'))
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(session({
  secret: ['key1', 'key2'],
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Basic route
app.use('/api/user', user);
app.use('/api', search);

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()

})

//app.use('/api/admin',admin);
//app.use('/api/donation', donateMedicine);

// Basic routes
app.use('/api/user', user);
app.use('/api', search);
app.use('/api/admin',admin);
app.use('/api/donation', donateMedicine);
app.use('/api/user', user);
app.use('/api', search);
app.use('/api/userProfile', userProfileRoute);

app.use('/api/userDashboard', userDashboardRoutes);
app.use('/api/userRequests', userRequestRoute);  // This will handle all routes in 'userRequestRoute' under '/api/userRequests'
app.use('/api/userRequested', userRequestedRoutes);  // This will handle all routes in 'userRequestedRoute' under '/api/userRequested'


//app.use('/api/userDashboard', userDashboardRoutes);

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body
    const apiKey = process.env.GEMINI_API_KEY

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = message;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.json(result.response.text())
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
