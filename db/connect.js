const mongoose = require("mongoose");

// it is got from mongodb atlas using thapa latest REST API
// uri = "mongodb+srv://Amith:HTDxWTIn7Xli3fOe@amithapi.xubmr5w.mongodb.net/AmithApi?retryWrites=true&w=majority&appName=AmithApi";
const connectDB = (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectDB;
