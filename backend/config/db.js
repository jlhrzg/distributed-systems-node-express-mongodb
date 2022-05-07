const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/');
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
