const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const connection = require("../db");

// require("dotenv").config();
// const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

// const connection = mysql.createConnection({
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASS,
//   database: DB_NAME,
// });

router.get("/", async (req, res) => {
  try {
    connection.query("SELECT * FROM member", (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  const { phone, pass_word } = req.body;
  // console.log(phone, "\n", pass_word);
  try {
    connection.query(
      "SELECT * FROM member WHERE phone = ? AND pass_word = ?",
      [phone, pass_word],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400);
        } else {
          // console.log(results);

          if (results == []) {
            // console.log(results)
            return res.status(501);
          } else {
            // console.log(results)
            return res.status(200).json(results);
          }
        }
      }
    );
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return res.status(500).send();
  }
});

// router.post("/register", async (req, res) => {
//   const {} = req.body;
//   // console.log(phone, "\n", pass_word);
//   try {
//     connection.query(
//       "INSERT INTO member VALUES  ",
//       [],
//       (err, results, fields) => {
//         if (err) {
//           console.log(err);
//           return res.status(400).send();
//         }
//         // console.log(results)
//         return res.status(200).json(results);
//       }
//     );
//   } catch (error) {
//     console.error("Error executing SQL query:", error);
//     return res.status(500).send();
//   }
// });

router.get("/packageone/:ID_package", async (req, res) => {
  const ID_Member = req.params.ID_Member;
  try {
    connection.query(
      `SELECT * FROM package WHERE ID_package = '${ID_package}'`,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/member", async (req, res) => {
  const firsname = req.body.firsname;
  const surename = req.body.surename;
  const pass_word = req.body.pass_word;
  const email = req.body.email;
  const sex = req.body.sex;
  const phone = req.body.phone;
  const address = req.body.address;
  const ID_Package = req.body.ID_Package;
  try {
    connection.query(
      `INSERT INTO member (firstname,surename,pass_word,Email,phone,sex,address,ID_Package)
         VALUES('${firsname}','${surename}','${pass_word}','${email}','${phone}','${sex}','${address}','${ID_Package}')`,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json({ statsu: "success" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.delete("/deleted/:ID_Member", async (req, res) => {
  const ID_Member = req.params.ID_Member;
  try {
    connection.query(
      `DELETE FROM member WHERE ID_Member = '${ID_Member}';`,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json({ statsu: "success" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.put("/update", async (req, res) => {
  const firstName = req.body.firstName;
  // const surename = req.body.surename
  // const pass_word = req.body.pass_word
  // const email = req.body.email
  // const sex = req.body.sex
  // const phone = req.body.phone
  // const address = req.body.address
  // const ID_Package = req.body.ID_Package
  const ID_Member = req.body.ID_Member;
  try {
    connection.query(
      `UPDATE member
         SET firstname = '${firstName}'
         WHERE ID_Member = '${ID_Member}'`,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json({ statsu: "success" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
