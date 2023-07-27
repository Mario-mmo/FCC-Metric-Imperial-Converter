const units = ['km', 'mi', 'kg', 'lbs', 'l', 'gal'];
const convertArr = [1/1.60934, 1.60934, 1/0.453592, 0.453592, 1/3.78541, 3.78541];
const bigUnit = ['kilometers', 'miles', 'kilograms', 'pounds', 'liters', 'gallons'];

const checkNum = (numString) => {
  const divideBar = numString.split('/');

  const n1 = divideBar[0] || 1;
  const n2 = divideBar[1] || 1;
  
  if (divideBar.length > 2 | divideBar[1] === '0') return false;
  if (isNaN(n1) | isNaN(n2)) return false;

  return true;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    const regex = /[.\d\/]+/g
    const number = input.match(regex);

    if (!number) return 1;
    else if (!checkNum(number[0])) return 'invalid number';
    if ((/\s/g).test(input)) return 'invalid number';

    return eval(number[0]);
  };
  
  this.getUnit = function(input) {
    const regex = /[a-z]+/g;
    let unit = input.toLowerCase().match(regex);

    if (!unit) return 'invalid unit';
    if (!units.includes(unit[0])) return 'invalid unit';
    if ((/\s/g).test(input)) return 'invalid unit';

    return unit[0];
  };
  
  this.getReturnUnit = function(initUnit) {
    const unit = this.getUnit(initUnit);
    const index = units.indexOf(unit);
    let returnUnit;

    if (index % 2 === 0) returnUnit = units[index + 1];
    else returnUnit = units[index - 1];
    return returnUnit;
  };

  this.spellOutUnit = function(unit) {
    const index = units.indexOf(unit);
    
    return bigUnit[index];
  };
  
  this.convert = function(initNum, initUnit) {
    let num = initNum;
    let unit = initUnit;
    let returnNum;

    let index = units.indexOf(unit);

    return Number((returnNum = num * convertArr[index]).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
  
}

module.exports = ConvertHandler;
