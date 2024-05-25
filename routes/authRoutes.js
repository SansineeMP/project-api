// routes/index.js
const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // ระบุโฟลเดอร์ที่จะเก็บไฟล์
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // ใช้ชื่อไฟล์เดิม
    }
})

const upload = multer({ storage: storage });

router.post("/login", authController.Login);
// router.post("/register", authController.Register);
router.post("/register", authController.Register);
router.get("/useracc/:ID_Member", authController.getMemberAcc);
router.put("/editmember", authController.Editmember);
router.put("/editpackage", authController.EditPackage);
router.delete("/deletemember/:ID_Member", authController.Deletemember);
router.get("/userExpired/:ID_Member", authController.checkExpired);
router.post("/paymant", authController.SavePayment);
// router.post("/paymant", upload.single('File'), authController.SavePayment);
// router.put("/editpackage/:ID_Member", authController.Editpackge);

// router.get("/useracc", authController.getMemberAcc);

module.exports = router;
