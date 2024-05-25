// controllers/videoController.js
const fs = require("fs");
const videoModel = require("../model/vedioModel");
const vedioModel = require("../model/vedioModel");

class VideoController {
  // getVideo(req, res) {
  //   const videoName = req.params.videoName;
  //   const pathfile = "C:/videoStream/";

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "video/mp4");

  //   const readStrem = fs.createReadStream(pathfile + videoName);
  //   readStrem.pipe(res);
  // }

  getVideo(req, res) {
    const videoName = req.params.videoName;
    const pathToFile = `C:/videoStream/${videoName}`;

    // Check if the file exists
    if (!fs.existsSync(pathToFile)) {
      return res.status(404).send("Video not found");
    }

    // Set the response headers
    res.statusCode = 200;
    res.setHeader("Content-Type", "video/mp4");

    // Create a read stream and pipe it to the response
    const readStream = fs.createReadStream(pathToFile);
    readStream.on('error', (err) => {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    });
    // console.log(readStream.read);
    readStream.pipe(res);
  }


  // Use the upload middleware before handling the request
  uploadVideo(req, res) {
    const videoType = req.body.videoType;
    const movieName = req.body.movieName;
    const videoDetail = req.body.videoDetail

    try {
      // if (!req.video) {
      //   return res.status(400).send("No file uploaded.");
      // }

      const uploadedFile = req.file;
      console.log("File uploaded:", uploadedFile);

      videoModel.addVideo(
        movieName,
        videoType,
        uploadedFile.filename,
        videoDetail,
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(400).send(err);
          }
          return res
            .status(200)
            .json({ status: "success", detail: uploadedFile, ID_movie: results.insertId });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }

  uploadImg(req, res) {
    const ID_movie = req.body.ID_movie
    try {
      // if (!req.file) {
      //   return res.status(400).send("No file uploaded.");
      // }

      const uploadedFile = req.file;
      console.log("File uploaded:", uploadedFile);

      videoModel.addImg(
        uploadedFile.filename,
        ID_movie,
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(400).send(err);
          }
          return res
            .status(200)
            .json({ status: "success", detail: uploadedFile });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }

  getAllVideos(req, res) {
    videoModel.getAllVideos((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  updateVideo(req, res) {
    const ID_movie = req.params.ID_movie;
    const updateData = req.body;
    // console.log(ID_Member);
    // console.log(updateData);
    vedioModel.updateVideo(ID_movie, updateData, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json({ status: "success" });
    });
  }

  deleteVideo(req, res) {
    const ID_movie = req.params.ID_movie;
    videoModel.deleteVideo(ID_movie, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json({ status: "success" });
    });
  }

  getVideoByID(req, res) {
    const ID_movie = req.params.ID_movie;
    // console.log(ID_Member);
    videoModel.getVideoByID(ID_movie, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }
  getPosterAllVideos(req, res) {
    videoModel.getPosterAllVideos((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).send(results);
    });
  }

  getPostertypeVideos(req, res) {
    // const ID_typeMovie = req.params.ID_typeMovie;
    // videoModel.getPostertypeVideos(ID_typeMovie,(err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(400).send();
    //   }
    //   // console.log(results);
    //   return res.status(200).send(results);
    // });
    videoModel.getPostertypeVideos((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).send(results);
    });
  }

  getPoster(req, res) {
    // Extract poster name from request parameters
  const img = req.params.poster_name;
  
  // Construct path to the file
  const pathToFile = 'C:/xampp/htdocs/project-api/poster/' + img;

  // Check if the file exists
  if (!fs.existsSync(pathToFile)) {
    return res.status(404).send("Image not found");
  }

  // Determine content type based on file extension
  //const contentType = getContentType(img);

  // Set response headers
  res.statusCode = 200;
  res.setHeader("Content-Type", 'image/jpg');

  // Create read stream and pipe it to the response
  const readStream = fs.createReadStream(pathToFile);
  readStream.on('error', (err) => {
    console.error('Error reading file:', err);
    res.status(500).send('Internal Server Error');
  });

  readStream.pipe(res);
  }

  getContentType(fileExtension) {
    switch (fileExtension.toLowerCase()) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpg';
      case '.png':
        return 'image/png';
      case '.gif':
        return 'image/gif';
      case '.svg':
        return 'image/svg+xml';
      default:
        return 'application/octet-stream'; // Default to binary data if type is unknown
    }
  }

  getMoviebyID(req, res) {

    // const ID_Member = req.query.ID_Member;
    const ID_movie = req.params.ID_movie;

    // console.log(ID_Member)
    videoModel.MoviebyID(ID_movie, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  getTypeMovie(req, res) {
    videoModel.getAllVideos((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }


}



module.exports = new VideoController();
