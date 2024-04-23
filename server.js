const express = require("express");
const app = express();
const dotenv = require("dotenv");
const databaseConnect = require("./config/db");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AuthRouter = require("./routes/auth.routes");

const globalErrorHandler = require("./middlewares/globalErrorHandler.middleware");

dotenv.config({ path: "../backend/config/.env" });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", AuthRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 8080;

databaseConnect();

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
