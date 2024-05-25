const connection = require("../connection");

class typeMovieModel {
  getTypeMovie(callback) {
    connection.query("SELECT * FROM type_movie", callback);
  }

  getTypeMoviebyID(ID_typemovie, callback) {
    connection.query(
      "SELECT * FROM type_movie WHERE ID_typemovie = ?",
      [ID_typemovie],
      callback
    );
  }

  getMoviebyID(ID_typemovie, callback) {
    connection.query(
      `SELECT * FROM movieandseries 
          JOIN poster ON poster.ID_movie = movieandseries.ID_movie WHERE ID_typemovie = ?`,
      [ID_typemovie],
      callback
    );
  }

  // getStatusMoviebyID(statusID, callback) {
  //   connection.query(
  //     "SELECT * FROM movieandseries WHERE statusID = ?",
  //     [statusID],
  //     callback
  //   );
  // }

  getHothitMovie(callback) {
    connection.query(
      "SELECT m.ID_movie, m.Name_movie, m.video_name, m.video_name, m.video_detail, t.nameTypemovie FROM movieandseries AS m LEFT JOIN type_movie AS t ON m.ID_typeMovie = t.ID_typeMovie WHERE statusID = 1 ORDER BY m.ID_movie DESC",
      callback
    );
  }
}
module.exports = new typeMovieModel();