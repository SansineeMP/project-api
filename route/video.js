const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const mysql = require("mysql2");
const { error } = require("console");

require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

router.get("/:videoName", async (req, res) => {
  const videoName = req.params.videoName;

  const pathfile = "C:/videoStream/";

  res.statusCode = 200;
  res.setHeader("Content-Type", "video/mp4");
  //console.log("Path ",path.join('./../video','cloud_-_9151 (720p).mp4'));
  const readStrem = fs.createReadStream(pathfile + videoName);

  readStrem.pipe(res);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/videoStream/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Define a route for handling file uploads
router.post("/upload", upload.single("video"), (req, res) => {
  //const videoName = req.body.videoName;
  const videoType = req.body.videoType;
  const movieName = req.body.movieName
  // The file is uploaded, and its information is available in req.file

  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Process the uploaded file as needed
    const uploadedFile = req.file;
    console.log("File uploaded:", uploadedFile);

    connection.query(
      `INSERT INTO movieandseries (Name_movie,ID_typeMovie,video_name) VALUES('${movieName}','${videoType}','${uploadedFile.filename}')`,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }
        return res.status(200).json({ statsu: "success",detail:uploadedFile});
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/video/getall", async (req, res) => {
    try {
      connection.query(
        "SELECT * FROM movieandseries",
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          return res.status(200).json(results);
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
});

router.delete("/deleted/:ID_movie", async (req, res) => {
  const ID_movie = req.params.ID_movie
   try {
     connection.query(
       `DELETE FROM movieandseries WHERE ID_movie = '${ID_movie}';`,
       (err, results, fields) => {
         if (err) {
           console.log(err);
           return res.status(400).send();
         }
         return res.status(200).json({"statsu":"success"});
       }
     );
   } catch (err) {
     console.log(err);
     return res.status(500).send();
   }
 });

module.exports = router;
