// models/memberModel.js
const connection = require("../connection");

class MemberModel {
  getAllMembers(callback) {
    connection.query(`SELECT * FROM member
    JOIN package ON package.ID_package = member.ID_package
    JOIN gender ON gender.ID_gender = member.ID_gender`, callback);
  }

  getType(ID_package,callback) {
    connection.query(`SELECT * FROM member
    JOIN package ON package.ID_package = member.ID_package
    JOIN gender ON gender.ID_gender = member.ID_gender
    WHERE member.ID_package = '${ID_package}'`, callback);
  }

  getMemberById(ID_Member, callback) {
    connection.query(
      `SELECT * FROM member WHERE ID_Member = ?`,
      [ID_Member],
      callback
    );
  }

  addMember(memberData, callback) {
    connection.query("INSERT INTO member SET ?", memberData, callback);
  }

  deleteMember(ID_Member, callback) {
    connection.query(
      "DELETE FROM member WHERE ID_Member = ?",
      [ID_Member],
      callback
    );
  }

  updateMember(ID_Member, updateData, callback) {
    connection.query(
      "UPDATE member SET ? WHERE ID_Member = ?",
      [updateData, ID_Member],
      callback
    );
  }
}

module.exports = new MemberModel();
