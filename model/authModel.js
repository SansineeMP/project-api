// models/authModel.js
const connection = require("../connection");

class AuthModel {
  LoginWithEmail(Email, pass_word, callback) {
    connection.query(
      "SELECT * FROM member WHERE Email = ? AND pass_word = ?",
      [Email, pass_word],
      callback
    );
  }

  LoginWithPhone(phone, pass_word, callback) {
    connection.query(
      "SELECT * FROM member WHERE phone = ? AND pass_word = ?",
      [phone, pass_word],
      callback
    );
  }

  // Register(
  //   firstname,
  //   surename,
  //   pass_word,
  //   Email,
  //   phone,
  //   ID_gender,
  //   address,
  //   ID_package,
  //   callback
  // ) {
  //   connection.query(
  //     "INSERT INTO member ( firstname, surename, pass_word, Email, phone, ID_gender, address,ID_package) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  //     [firstname, surename, pass_word, Email, phone, ID_gender, address, ID_package],
  //     callback
  //   );
  // }

  Register(
    firstname,
    surename,
    pass_word,
    Email,
    phone,
    ID_gender,
    address,
    ID_package,
    payment,
    paymentDate,
    callback
  ) {
    connection.query(
      "INSERT INTO member ( firstname, surename, pass_word, Email, phone, ID_gender, address,ID_package,payment,payment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [firstname, surename, pass_word, Email, phone, ID_gender, address, ID_package,payment,paymentDate],
      callback
    );
  }

  UserAcc(ID_Member, callback) {
    connection.query(
      "SELECT * FROM member JOIN package ON package.ID_package = member.ID_package WHERE ID_Member = ?",
      [ID_Member],
      callback
    );
  }

  getExpired(ID_Member, callback) {
    connection.query(
      "SELECT `ID_package`,`payment`,`payment_date` FROM member WHERE ID_Member = ?",
      [ID_Member],
      callback
    );
  }

  setExpired(Silp, paymentDate, ID_Member, callback) {
    connection.query(
      "UPDATE member SET payment = ?, payment_date = ? WHERE ID_Member = ?",
      [Silp, paymentDate, ID_Member],
      callback
    );
  }

  Editmember(pass_word, Email, phone, ID_Member, callback) {
    // console.log(ID_Member, pass_word, Email, phone);
    connection.query(
      "UPDATE member SET  pass_word = ? , Email = ? , phone = ? WHERE ID_Member = ?",
      [pass_word, Email, phone, ID_Member],
      callback
    );
  }

  EditPackage(ID_package, payment,formattedDate, ID_Member, callback) {
    // console.log(ID_Member, pass_word, Email, phone);
    connection.query(
      "UPDATE member SET  ID_package = ? , payment = ? , payment_date = ? WHERE ID_Member = ?",
      [ID_package, payment, formattedDate, ID_Member],
      callback
    );
  }

  Deletemember(ID_Member, callback) {
    connection.query(
      "DELETE FROM member WHERE ID_Member = ?",
      [ID_Member],
      callback
    );
  }

}

module.exports = new AuthModel();
