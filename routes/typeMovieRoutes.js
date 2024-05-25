// routes/index.js
const express = require("express");
const router = express.Router();
const typeMovie = require("../controller/typeMovieController");

router.get("/status", typeMovie.getTypeMovie);
router.get("/status/:ID_typemovie", typeMovie.getTypeMoviebyID);
router.get("/movie/:ID_typemovie", typeMovie.getMoviebyID);
// router.get("/statusmovie/:statusID", typeMovie.getStatusMoviebyID);
router.get("/hothit/", typeMovie.getHothitMovie);




module.exports = router;
