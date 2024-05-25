// models/packageModel.js
const connection = require("../connection");

class PackageModel {
  getAllPackages(callback) {
    connection.query("SELECT * FROM package", callback);
  }

  addPackage(packageDetail, packagePrice, callback) {
    connection.query(
      "INSERT INTO package (packageDetail, packagePrice) VALUES (?, ?)",
      [packageDetail, packagePrice],
      callback
    );
  }

  deletePackage(ID_package, callback) {
    connection.query(
      "DELETE FROM package WHERE ID_package = ?",
      [ID_package],
      callback
    );
  }

  updatePackage(ID_package, packageDetail, packagePrice, callback) {
    connection.query(
      "UPDATE package SET packageDetail = ?, packagePrice = ? WHERE ID_package = ?",
      [packageDetail, packagePrice, ID_package],
      callback
    );
  }

  getPackagesID(ID_package, callback) {
    connection.query(
      "SELECT * FROM package WHERE ID_package = ?",
      [ID_package],
      callback
    );
  }
}


module.exports = new PackageModel();
