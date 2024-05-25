const typeMovieModel = require("../model/typeMovieModel");

class typeMovieController {
  getTypeMovie(req, res) {
    typeMovieModel.getTypeMovie((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  getTypeMoviebyID(req, res) {

    // const ID_typemovie = req.query.ID_typemovie;
    const ID_typemovie = req.params.ID_typemovie;

    // console.log(ID_typemovie)
    typeMovieModel.getTypeMoviebyID(ID_typemovie, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  getMoviebyID(req, res) {

    // const ID_typemovie = req.query.ID_typemovie;
    const ID_typemovie = req.params.ID_typemovie;

    // console.log(ID_typemovie)
    typeMovieModel.getMoviebyID(ID_typemovie, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  // getStatusMoviebyID(req, res) {

  //   // const statusID = req.query.statusID;
  //   const statusID = req.params.statusID;

  //   // console.log(statusID)
  //   typeMovieModel.getStatusMoviebyID(statusID, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(400).send();
  //     }
  //     // console.log(results);
  //     return res.status(200).json(results);
  //   });
  // }

  getHothitMovie(req, res) {
    // console.log(statusID)
    typeMovieModel.getHothitMovie((err, results) => {
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