// routes/index.js
const express = require("express");
const router = express.Router();
const memberController = require("../controller/memberController");

router.get("/members", memberController.getAllMembers);
router.get("/member/:ID_Member", memberController.getMemberById);
router.post("/member", memberController.addMember);
router.delete("/deleted/:ID_Member", memberController.deleteMember);
router.put("/update/:ID_Member", memberController.updateMember);
router.get("/membertype/:ID_package", memberController.getTypeMembers);

module.exports = router;
