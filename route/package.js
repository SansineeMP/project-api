const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

router.get("/", async (req, res) => {
    try {
      connection.query(
        "SELECT * FROM package",
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
  
  router.get("/memberone/:ID_Member", async (req, res) => {
      const ID_Member = req.params.ID_Member
      try {
        connection.query(
          `SELECT * FROM member WHERE ID_Member = '${ID_Member}'`,
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
  
    router.post("/package", async (req, res) => {
      const packageDetail = req.body.packageDetail
      const packagePrice = req.body.packagePrice
      try {
        connection.query(
          `INSERT INTO package (packageDetail,packagePrice)
           VALUES('${packageDetail}','${packagePrice}')`,
          (err, results, fields) => {
            if (err) {
              console.log(err);
              return res.status(400).send();
            }
            return res.status(200).json({"statsu":"success"});
          }
        );
      } catch (err) {
        console.log(err);
        return res.status(500).send();
      }
    });
 
  
    router.delete("/deleted/:ID_package", async (req, res) => {
     const ID_package = req.params.ID_package
      try {
        connection.query(
          `DELETE FROM package WHERE ID_package = '${ID_package}';`,
          (err, results, fields) => {
            if (err) {
              console.log(err);
              return res.status(400).send();
            }
            return res.status(200).json({"statsu":"success"});
          }
        );
      } catch (err) {
        console.log(err);
        return res.status(500).send();
      }
    });
  
    router.put("/update", async (req, res) => {
        const packageDetail = req.body.packageDetail
        const packagePrice = req.body.packagePrice
        const ID_package =req.body.ID_package
        try {
            connection.query(
            `UPDATE package
            SET packageDetail = '${packageDetail}',packagePrice = '${packagePrice}'
            WHERE ID_package = '${ID_package}'`,
            (err, results, fields) => {
                if (err) {
                console.log(err);
                return res.status(400).send();
                }
                return res.status(200).json({"statsu":"success"});
            }
            );
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
     });
  
  module.exports = router;