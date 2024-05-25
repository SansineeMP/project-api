// models/videoModel.js
const connection = require("../connection");

class VideoModel {
  getAllVideos(callback) {
    connection.query(`SELECT * FROM movieandseries
    JOIN type_movie ON type_movie.ID_typeMovie = movieandseries.ID_typeMovie`, callback);
  }

  deleteVideo(ID_movie, callback) {
    connection.query(
      "DELETE FROM movieandseries WHERE ID_movie = ?",
      [ID_movie],
      callback
    );
  }

  addVideo(movieName, videoType, filename,videoDetail, callback) {
    connection.query(
      "INSERT INTO movieandseries (Name_movie, ID_typeMovie, video_name,video_detail) VALUES (?, ?, ?,?)",
      [movieName, videoType, filename,videoDetail],
      callback
    );
  }

  updateVideo(ID_movie, updateData, callback) {
    connection.query(
      "UPDATE movieandseries SET ? WHERE ID_movie = ?",
      [updateData, ID_movie],
      callback
    );
  }

  addImg(filename,ID_movie, callback) {
    connection.query(
      "INSERT INTO poster (poster_name,ID_movie) VALUES (?,?)",
      [filename,ID_movie],
      callback
    );
  }

  getVideoByID(ID_movie, callback) {
    connection.query(
      "SELECT * FROM movieandseries WHERE ID_movie = ?",
      [ID_movie],
      callback
    );
  }

  getPosterAllVideos(callback) {
    connection.query(`SELECT * FROM movieandseries 
    JOIN poster ON poster.ID_movie = movieandseries.ID_movie`, callback);
  }

  getPostertypeVideos(callback) {
    connection.query(`SELECT * FROM movieandseries 
    JOIN poster ON poster.ID_movie = movieandseries.ID_movie
    WHERE ID_typeMovie = 3`,
    callback);
  }

  MoviebyID(ID_movie, callback) {
    connection.query(
      "SELECT * FROM movieandseries WHERE ID_movie = ?",
      [ID_movie],
      callback
    );
  }

  getTypeMovie(callback) {
    connection.query("SELECT * FROM type_movie", callback);
  }

}

module.exports = new VideoModel();
