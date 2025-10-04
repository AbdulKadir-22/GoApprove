const express = require('express');
const cors = require('cors');
const app = express();
const adminRoutes = require('./routes/admin');
const userAuthRoutes = require('./routes/user'); 
const connectDB = require('./config/db');
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
connectDB();

app.use('/user', userAuthRoutes);
app.use('/admin', adminRoutes);



module.exports = app;
