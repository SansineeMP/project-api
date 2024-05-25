// routes/index.js
const express = require("express");
const router = express.Router();
const packageController = require("../controller/packageController");

router.get("/", packageController.getAllPackages);
router.get("/packageID/:ID_package", packageController.getPackagesID);
router.post("/package", packageController.addPackage);
router.delete("/deleted/:ID_package", packageController.deletePackage);
router.put("/update/:ID_package", packageController.updatePackage);

module.exports = router;
