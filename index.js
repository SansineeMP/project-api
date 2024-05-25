// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const packageRoutes = require("./routes/packageRoutes");
const videoRoutes = require("./routes/videoRoutes");
const typeMovieRoutes = require("./routes/typeMovieRoutes")
const movieLikeRoutes = require("./routes/movieLikeRoutes")
const sumPriceRoutes = require("./routes/SumPriceRoutes")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Custom CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Connection API");
});

// Routes
app.use("/auth", authRoutes);
app.use("/member", memberRoutes);
app.use("/package", packageRoutes);
app.use("/video", videoRoutes);
app.use("/typemovie", typeMovieRoutes);
app.use("/movielike", movieLikeRoutes);
app.use("/sumprice",sumPriceRoutes)






// // index.js
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const authRoutes = require("./routes/authRoutes");
// const memberRoutes = require("./routes/memberRoutes");
// const packageRoutes = require("./routes/packageRoutes");
// const vedioRoutes = require("./routes/vedioRoutes");

// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())
// app.use(cors())
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow_Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-Whith, Content-Type, Accept",
//        "multipart/form-data",
//     );
//     next();
//   });
  
// app.use(cors()); // Use the CORS middleware
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.status(200).send("connection API");
// });

// app.use("/auth", authRoutes);
// app.use("/member", memberRoutes);
// app.use("/package", packageRoutes);
// app.use("/video", vedioRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
