// models/memberModel.js
const connection = require("../connection");

class MemberModel {
  getMovieLike(ID_Member,ID_movie,callback) {
    connection.query(`SELECT * FROM memberlike WHERE ID_Member= '${ID_Member}' AND ID_movie = '${ID_movie}'`, callback);
  }

  addMovieLike(ID_Member,ID_movie,statusLike, callback) {
    connection.query("INSERT INTO memberlike (ID_Member,ID_movie,status_like) VALUES(?,?,?)", [ID_Member,ID_movie,statusLike] ,callback);
  }

  deleteMovieLike(memberlike_ID, callback) {
    connection.query(
      "DELETE FROM memberlike WHERE memberlike_ID = ?",
      [memberlike_ID],
      callback
    );
  }

  getMovieLikeAll( callback) {
    connection.query(
      `SELECT memberlike.ID_movie,COUNT(memberlike.status_like)AS Likes,movieandseries.Name_movie,poster.poster_name FROM memberlike 
       JOIN movieandseries ON memberlike.ID_movie = movieandseries.ID_movie 
       JOIN poster ON poster.ID_movie = memberlike.ID_movie
       GROUP BY ID_movie 
       ORDER BY COUNT(status_like) DESC  
       LIMIT 3 `,    
      callback
    );
  }

  getMovieNumberone( callback) {
    connection.query(
      `SELECT memberlike.ID_movie, COUNT(memberlike.status_like) AS Likes, movieandseries.Name_movie, poster.poster_name 
        FROM memberlike 
        JOIN movieandseries ON memberlike.ID_movie = movieandseries.ID_movie 
        JOIN poster ON poster.ID_movie = memberlike.ID_movie
        GROUP BY ID_movie 
        ORDER BY COUNT(status_like) DESC  
      LIMIT 1`,    
      callback
    );
  }

  getNameVideo(callback) {
    connection.query("SELECT * FROM movieandseries", callback);
  }
}

module.exports = new MemberModel();
