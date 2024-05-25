// controllers/memberController.js
const memberModel = require("../model/memberModel");

class MemberController {
  getAllMembers(req, res) {
    memberModel.getAllMembers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json(results);
    });
  }

  getTypeMembers(req, res) {
    const ID_package = req.params.ID_package
    memberModel.getType(ID_package,(err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json(results);
    });
  }

  getMemberById(req, res) {
    const ID_Member = req.params.ID_Member;
    // console.log(ID_Member);
    memberModel.getMemberById(ID_Member, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  addMember(req, res) {
    const memberData = req.body;
    memberModel.addMember(memberData, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json({ status: "success" });
    });
  }

  deleteMember(req, res) {
    const ID_Member = req.params.ID_Member;
    memberModel.deleteMember(ID_Member, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json({ status: "success" });
    });
  }

  updateMember(req, res) {
    const ID_Member = req.params.ID_Member;
    const updateData = req.body;
    // console.log(ID_Member);
    // console.log(updateData);
    memberModel.updateMember(ID_Member, updateData, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json({ status: "success" });
    });
  }
}

module.exports = new MemberController();
