const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const http = require('http');
const server = http.createServer(app)
const user = require('./routes/userRoute');
const search = require('./routes/searchRoute');

app.use(cors());
app.use(express.static('public'))
app.use(express.json())
/*app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})*/

// Basic route
app.use('/api/user', user);
app.use('/api', search);

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
