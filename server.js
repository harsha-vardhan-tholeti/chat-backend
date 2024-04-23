const express = require("express");
const app = express();
const dotenv = require("dotenv");
const databaseConnect = require("./config/db");

const bodyParser = require("body-parser");

const AuthRouter = require("./routes/auth.routes");

dotenv.config({ path: "../backend/config/.env" });

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

databaseConnect();

app.use("/api/v1/auth", AuthRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
