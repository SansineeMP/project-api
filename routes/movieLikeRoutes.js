// routes/index.js
const express = require("express");
const router = express.Router();
const movieLikeController = require("../controller/movieLikeController");

router.post("/like", movieLikeController.addLike);
router.get("/all", movieLikeController.getMovieLike);
router.get("/numberone", movieLikeController.getMovieNumberone);
router.get("/namevideo", movieLikeController.getNameVideo);




module.exports = router;
