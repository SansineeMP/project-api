// controllers/authController.js
const authModel = require("../model/authModel");
const moment = require("moment")
const jwt = require("jsonwebtoken"); // Assuming you're using JWT for token generation

class AuthController {
  Login(req, res) {
    const { username, pass_word } = req.body;
    // Regular expressions to check if the username is an email or a phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (emailRegex.test(username)) {
      authModel.LoginWithEmail(username, pass_word, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(400).send();
        } else {
          return res.status(200).json(results[0]['ID_Member']);
        }
      });
    } else if (phoneRegex.test(username)) {
      authModel.LoginWithPhone(username, pass_word, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(400).send();
        } else {
          return res.status(200).json(results[0]['ID_Member']);
        }
      });
    } else {
      return res.status(400).send("Invalid input");
    }
  }

  // Register(req, res) {
  //   const {
  //     firstname,
  //     surename,
  //     pass_word,
  //     Email,
  //     phone,
  //     sex,
  //     address,
  //     ID_Package,
  //   } = req.body;
  //   authModel.Register(
  //     firstname,
  //     surename,
  //     pass_word,
  //     Email,
  //     phone,
  //     sex,
  //     address,
  //     ID_Package,
  //     (err, results) => {
  //       if (err) {
  //         console.error(err);
  //         return res.status(400).send();
  //       }
  //       // console.log(results.insertId)
  //       return res.status(200).json(results.insertId);
  //     }
  //   );
  // }

  Register(req, res) {
    const {
      firstname,
      surename,
      pass_word,
      Email,
      phone,
      sex,
      address,
      ID_Package,
    } = req.body;
    const currentDate = moment();
    const payment = 1;
    const formattedDate = currentDate.format('YYYY-MM-DD HH-mm');
    authModel.Register(
      firstname,
      surename,
      pass_word,
      Email,
      phone,
      sex,
      address,
      ID_Package,
      payment,
      formattedDate,
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(400).send();
        }
        // console.log(results.insertId)
        return res.status(200).json(results.insertId);
      }
    );
  }

  getMemberAcc(req, res) {

    // const ID_Member = req.query.ID_Member;
    const ID_Member = req.params.ID_Member;

    // console.log(ID_Member)
    authModel.UserAcc(ID_Member, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  Editmember(req, res) {
    const ID_Member = req.body.ID_Member;
    const pass_word = req.body.pass_word;
    const Email = req.body.Email;
    const phone = req.body.phone;

    // console.log(ID_Member, pass_word, Email, phone);

    authModel.Editmember(
      pass_word,
      Email,
      phone,
      ID_Member,
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(400).send('Error');
        }
        return res.status(200).json(results);
      }
    );
  }

  EditPackage(req, res) {
    const ID_Member = req.body.ID_Member;
    const ID_package = req.body.ID_package;
    const currentDate = moment();
    const payment = 2;
    const formattedDate = currentDate.format('YYYY-MM-DD HH-mm');
    authModel.EditPackage(
      ID_package,
      payment,
      formattedDate,
      ID_Member,
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(400).send('Error');
        }
        return res.status(200).json(results);
      }
    );
  }

  Deletemember(req, res) {
    const ID_Member = req.params.ID_Member;
    authModel.Deletemember(ID_Member, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).json({ status: "success" });
    });
  }


  checkExpired(req, res) {
    const ID_Member = req.params.ID_Member;
    authModel.getExpired(ID_Member, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }

      if (results.length === 0 || results[0].payment === null || results[0].payment_date === null) {
        authModel.setExpired(0, null, ID_Member)
        return res.status(400).send({ message: 'None found payment', results });
      }

      const currentDate = moment();
      let ExpiredDate = null;

      switch (results[0].ID_package) {
        case 1:
          ExpiredDate = moment(results[0].payment_date).add(1, 'year');
          break;
        case 2:
          ExpiredDate = moment(results[0].payment_date).add(1, 'month');
          break;
        case 5:
          ExpiredDate = moment(results[0].payment_date).add(7, 'days');
          break;
        default:
          console.log("Invalid package ID:", results[0].ID_package);
          return res.status(400).send({ message: 'Invalid package ID', results });
      }

      // Compare dates
      if (!ExpiredDate) {
        console.log("Invalid package ID:", results[0].ID_package);
        return res.status(400).send({ message: 'Invalid package ID', results });
      }
      if (currentDate.isAfter(ExpiredDate, 'day')) {
        authModel.setExpired(0, null, ID_Member, (err, result) => {
          if (result) {
            res.status(203).send({ message: 'Payment expired' });
          } else {
            console.log("Error updating status:", err);
            res.status(500).send({ message: 'Internal Server Error' });
          }
        });
      } else {
        return res.status(200).send({ message: 'Payment not expire' });
      }
    });
  }

  SavePayment(req, res) {
    const ID_Member = req.body.ID_Member;
    const Silp = req.body.file; // รับไฟล์ที่อัพโหลดมา

    if (Silp) {
      const currentDate = moment();
      const formattedDate = currentDate.format('YYYY-MM-DD HH-mm');

      authModel.setExpired(Silp, formattedDate, ID_Member, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).send(false);
        }
        return res.status(200).send(true);
      });
    }
  }
}

module.exports = new AuthController();
