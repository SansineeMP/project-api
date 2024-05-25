const connection = require("../connection");

class SumPriceModel {
  getTotal(callback) {
    connection.query(`SELECT SUM(package.packagePrice)AS Total FROM member
    JOIN package ON package.ID_package = member.ID_package`, callback);
  }

  getType(callback) {
    connection.query(`SELECT SUM(package.packagePrice)AS Total,package.packageDetail FROM member
    JOIN package ON package.ID_package = member.ID_package
    GROUP BY package.ID_package`, callback);
  }

}
module.exports = new SumPriceModel();