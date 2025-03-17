const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const user = require('./routes/userRoute');
const search = require('./routes/searchRoute');
const admin = require('./routes/adminRoute');
const donateMedicine = require('./routes/donationRoute');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passport');
const userProfileRoute = require('./routes/userProfileRoute');
const userDashboardRoutes = require('./routes/userDashboardRoute');
const userRequestRoute = require('./routes/userRequestsRoute');
const userRequestedRoutes = require('./routes/userRequestedRoute');
app.use(cors({
  origin: 'http://localhost:3000',
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}));
app.use(express.static('public'))
app.use(express.json())


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

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

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
      const { message } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
          {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  contents: [{ role: 'user', parts: [{ text: message }] }]
              })
          }
      );

      const data = await response.json();
      res.json(data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});