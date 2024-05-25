// controllers/packageController.js
const packageModel = require("../model/packageModel");

class PackageController {
  getAllPackages(req, res) {
    packageModel.getAllPackages((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json(results);
    });
  }

  addPackage(req, res) {
    const { packageDetail, packagePrice } = req.body;
    packageModel.addPackage(packageDetail, packagePrice, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json({ status: "success" });
    });
  }

  deletePackage(req, res) {
    const ID_package = req.params.ID_package;
    packageModel.deletePackage(ID_package, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json({ status: "success" });
    });
  }

  updatePackage(req, res) {
    const { packageDetail, packagePrice, ID_package } = req.body;
    packageModel.updatePackage(
      ID_package,
      packageDetail,
      packagePrice,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json({ status: "success" });
      }
    );
  }

  getPackagesID(req, res) {
    const ID_package = req.params.ID_package;
    // console.log(ID_Member);
    packageModel.getPackagesID(ID_package, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }
}

module.exports = new PackageController();
