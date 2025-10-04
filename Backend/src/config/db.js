const mongoose = require("mongoose");
const uri = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://yashprajapati121204:12345@cluster0.ig51s.mongodb.net/');
    console.log('MongoDB database connected');
  } catch (error) {
    console.error(`There is some error connecting to MongoDB`);
    process.exit(1);
  }
};

module.exports = connectDB;