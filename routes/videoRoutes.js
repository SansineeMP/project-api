// routes/videoRoutes.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();
const videoController = require("../controller/vedioController");

// Define storage for multer (Only Cast)
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

// Create multer instance with the defined storage
const upload = multer({ storage: storage });

const storageImg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "poster/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create multer instance with the defined storage
const uploadImg = multer({ storage: storageImg });

router.get("/:videoName", videoController.getVideo);
router.post("/upload", upload.single("video"),videoController.uploadVideo);
router.get("/video/getall", videoController.getAllVideos);
router.get("/video/:ID_movie", videoController.getVideoByID);
router.get("/movie/:ID_movie", videoController.getMoviebyID);
router.delete("/deleted/:ID_movie", videoController.deleteVideo);
router.put("/update/:ID_movie",videoController.updateVideo);
router.post("/uploadimg",uploadImg.single("img"),videoController.uploadImg);
router.get("/poster/posterall", videoController.getPosterAllVideos);
router.get("/poster/postertype", videoController.getPostertypeVideos);
router.get("/poster/:poster_name", videoController.getPoster);
router.get("/typemovie", videoController.getTypeMovie);

module.exports = router;
