/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {

    test('Whole number input', function(done) {
      var input = '32L';
      console.log("1a4kkg:", convertHandler.getNum('1a4kkg'));
      assert.equal(convertHandler.getNum(input),32);
      done();
    });

    test('Decimal Input', function(done) {
      var input = '32.33mi';
      assert.equal(convertHandler.getNum(input),32.33);
      done();
    });

    test('Fractional Input', function(done) {
      var input = '1/3gal';
      assert.equal(convertHandler.getNum(input), '1/3');
      done();
    });

    test('Fractional Input w/ Decimal', function(done) {
      var input = '1.25/3.14lbs';
      assert.equal(convertHandler.getNum(input), '1.25/3.14');
      done();
    });

//     test('Invalid Input (double fraction)', function(done) {
//       var input = '3/7.2/4kg';
//       console.log("GET NUM", convertHandler.getNum(input));
//       assert.equal(convertHandler.getNum(input),1.25/3);
//       done();
//     });

    test('No Numerical Input', function(done) {
      var input = 'km';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        var unit = convertHandler.getUnit(ele);
        assert.notEqual(unit, undefined);
      });
      done();
    });

    test('Unknown Unit Input', function(done) {
      var unit = convertHandler.getUnit('s');
      assert.notEqual(unit, undefined);
      done();
    });

  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      let possibleUnits = ['lbs', 'gal', 'mi', 'kg', 'l', 'km'];
      let spellOutUnits = ['pounds', 'gallons', 'miles', 'kilograms', 'liters', 'kilometers'];
      possibleUnits.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), spellOutUnits[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.convert(num, unit)', function() {

    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('L to Gal', function(done) {
      var input = [5, 'L'];
      var expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Mi to Km', function(done) {
      var input = [3, 'Mi'];
      var expected = 4.82802;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Km to Mi', function(done) {
      var input = [33, 'kM'];
      var expected = 20.5053;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
   });

    test('Lbs to Kg', function(done) {
      var input = [3.3, 'Lbs'];
      var expected = 1.49685;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('Kg to Lbs', function(done) {
      var input = [2, 'Kg'];
      var expected = 4.40925;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

  });

});
