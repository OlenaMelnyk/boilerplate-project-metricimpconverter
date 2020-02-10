/*
*
*
*       Complete the handler logic below
*
*
*/

function ConvertHandler() {

  const possibleUnits = ['lbs', 'gal', 'mi', 'kg', 'l', 'km'];
  const spellOutUnits = ['pounds', 'gallons', 'miles', 'kilograms', 'liters', 'kilometers'];

  this.getNum = function(input) {
    var result = input.replace(/[A-Za-z]+/g , '');
    //console.log("IN", input, result, "=", input.indexOf(result));
    if (input.indexOf(result) == -1)
      return undefined;
    return (result.length == 0) ? 1 : result;
  };

  this.getUnit = function(input) {
    var result = input.replace(/[+-./*\d]+/g , '').toLowerCase();
    console.log("GET UNIT:", input, result, possibleUnits.indexOf(result))
    return possibleUnits.indexOf(result) != -1 ? result: undefined;
  };

  this.getReturnUnit = function(initUnit) {
    let index = possibleUnits.indexOf(initUnit);
    let half = possibleUnits.length / 2;
    let result;
    if (index != -1) {
        if (index > 2) {
          result = possibleUnits[index%half];
      } else {
        result = possibleUnits[half + index];
      }
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    var index = possibleUnits.indexOf(unit);
    if (index != undefined)
      return spellOutUnits[index];
    return '';
  };

  this.convert = function(initNum, initUnit) {

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result = undefined;
    initUnit = this.getUnit(initUnit);
    switch(initUnit) {
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        break;
    }
    return result == undefined ? result : Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    var result;
    if (returnUnit != undefined && returnNum != undefined) {
      result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' +this.spellOutUnit(returnUnit);
    }

    return result;
  };

}

module.exports = ConvertHandler;
