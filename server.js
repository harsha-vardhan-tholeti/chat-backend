const express = require("express");
const app = express();
const dotenv = require("dotenv");
const databaseConnect = require("./config/db");

dotenv.config({ path: "../backend/config/.env" });

const port = process.env.PORT || 8080;

databaseConnect();

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
