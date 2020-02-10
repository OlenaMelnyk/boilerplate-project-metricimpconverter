/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      if (initNum == undefined && initUnit == undefined) {

        return res.status(400).json({"error":"Invalid input number and unit"});
      } else if (initNum == undefined) {
        return res.status(400).json({"error":"Invalid input number"});
      } else if (initUnit == undefined) {
        return res.status(400).json({"error":"Invalid input unit"});
      }

      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      //    {"initNum":3.1,"initUnit":"mi","returnNum":4.98895,"returnUnit":"km","string":"3.1 miles converts to 4.98895 kilometers"}

     let obj = {"initNum":initNum,"initUnit":initUnit,
                 "returnNum":returnNum,"returnUnit":returnUnit,
                 "string":toString};
      return res.json(obj);
    });

};
