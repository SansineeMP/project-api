const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");

// const _ = require("lodash");
const cors = require("cors");
const { request } = require("express");
require("dotenv").config();
const { DB_NAME, DB_HOST, DB_PASS, DB_USER } = process.env;
const path = require("path");

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow_Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Whith, Content-Type, Accept",
    "multipart/form-data"
  );
  next();
});

connection.connect((err) => {
  if (err) {
    console.log("Not connect database");
    return;
  }
  app.get("/", async (req, res) => {
    console.log("Connect Database Succss fully");
    return res.status(200).json("Connect Database");
  });
});

console.log(`Port :: ${process.env.PORT}`);

app.use(cors());
app.use(express.json());

app.use("/member", require("./route/member"));
app.use("/package", require("./route/package"));
//app.use("/video", require (".route/video"));
app.use("/video", require("./route/video"));

app.listen(process.env.PORT, function () {
  console.log("CORS-enabled web server listening on port ", process.env.PORT);
});
