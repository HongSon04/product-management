const mongoose = require("mongoose");
require("dotenv").config();

const checkConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Kết nối thành công");
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkConnect;