const express = require("express");
const colors = require("colors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const connectDB = require("./config/database");

const app = express();

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
