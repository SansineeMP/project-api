const mysql = require("mysql2");
require("dotenv").config();
const { DB_NAME, DB_HOST, DB_PASS, DB_USER } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

// async function connectAndQuery(query) {
//   connect.query(
//       'SELECT * FROM `member`',
//       function(err, results, fields) {
//         res.json(results);
//       }
//     );
// }

module.exports = connection;
