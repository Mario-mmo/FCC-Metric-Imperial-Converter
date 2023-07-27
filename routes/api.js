'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;

    let number = convertHandler.getNum(input);
    if (number === 'invalid number') number = false;

    let unit = convertHandler.getUnit(input)
    if (unit === 'invalid unit') unit = false;

    if (number === false & unit === false) res.send('invalid number and unit');
    else if (number === false) res.send('invalid number');
    else if (unit === false) res.send('invalid unit');

    else {
      let returnUnit = convertHandler.getReturnUnit(unit);
      let returnNum = convertHandler.convert(number, unit);
      let str = convertHandler.getString(number, unit, returnNum, returnUnit);

      res.json({ 'initNum': number , 'initUnit': unit === 'l' ? 'L' : unit, 'returnNum': returnNum, 'returnUnit': returnUnit === 'l' ? 'L' : returnUnit, string: str});
    }
  });

};
