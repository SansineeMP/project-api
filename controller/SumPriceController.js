const SumPriceModel = require("../model/SumPriceModel");

class SumPriceController {
  getTotal(req, res) {
    SumPriceModel.getTotal((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }

  getType(req, res) {
    SumPriceModel.getType((err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // console.log(results);
      return res.status(200).json(results);
    });
  }
}

module.exports = new SumPriceController();