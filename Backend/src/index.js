const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

const userAuthRoutes = require('./routes/user.route'); 
app.use('/api/user', userAuthRoutes);

module.exports = app;
