const movieLikeModel = require("../model/movieLikeModel");

class typeMovieController {
  addLike(req, res) {
    const ID_Member = req.body.ID_Member
    const ID_movie = req.body.ID_movie
    movieLikeModel.getMovieLike(ID_Member,ID_movie,(err, results) => {
        console.log("result ",results);
      if(results.length > 0){//delete
        movieLikeModel.deleteMovieLike(results[0].memberlike_ID,(err,results)=>{
            return res.status(204).json({status:"deleted success"});
        })
      }else{//insert
        movieLikeModel.addMovieLike(ID_Member,ID_movie,'1',(err,results)=>{
            return res.status(201).json({status:"insert success"});
        })
      }
    });
  }

  getMovieLike(req, res) {

    // const ID_typemovie = req.query.ID_typemovie;
    //const ID_typemovie = req.params.ID_typemovie;

    // console.log(ID_typemovie)
    movieLikeModel.getMovieLikeAll((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  getMovieNumberone(req, res) {
    movieLikeModel.getMovieNumberone((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  

  getNameVideo(req, res) {
    // console.log(statusID)
    movieLikeModel.getNameVideo((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }


}

module.exports = new typeMovieController();