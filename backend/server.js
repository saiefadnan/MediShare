const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const http = require('http');
const server = http.createServer(app)
const user = require('./routes/userRoute');

const search = require('./routes/searchRoute');

const admin = require('./routes/adminRoute');
const donateMedicine = require('./routes/donationRoute');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passport');
const userProfileRoute = require('./routes/userProfileRoute');


app.use(cors({
  origin: 'http://localhost:3000',
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}));
app.use(express.static('public'))
app.use(express.json())
/*app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()

})*/

// Basic route
app.use('/api/user', user);
app.use('/api', search);


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

app.use('/api/admin',admin);
app.use('/api/donation', donateMedicine);



app.use('/api/user', user);
app.use('/api', search);
app.use('/api', userProfileRoute);


// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
