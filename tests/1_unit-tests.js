const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const units = ['km', 'mi', 'kg', 'lbs', 'l', 'gal'];
const convertArr = [1 / 1.60934, 1.60934, 1 / 0.453592, 0.453592, 1 / 3.78541, 3.78541];
const bigUnit = ['kilometers', 'miles', 'kilograms', 'pounds', 'liters', 'gallons'];

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('Input contains a whole number', function () {
        const input = '5gal';
        assert.isNumber(convertHandler.getNum(input), 10);
    })

    test('Input contains a decimal number', function () {
        const input = '1.2km';
        assert.isNumber(convertHandler.getNum(input), 2.5);
    })

    test('Input contains a fraction', function () {
        const input = '1/5mi';
        assert.isNumber(convertHandler.getNum(input), 1 / 5);
    })

    test('Input contains a decimal fraction', function () {
        const input = ['2.5/3kg', '2.5/3.4kg', '3/5.2l']

        input.forEach(i => {
            assert.isNumber(convertHandler.getNum(i));
        })
    })

    test('Error on double fraction input', function () {
        const input = '1/10/3kg';
        assert.equal(convertHandler.getNum(input), 'invalid number');
    })

    test('Set number to 1 if input number does not exist', function () {
        const input = 'l';
        assert.equal(convertHandler.getNum(input), 1);
    })

    test('Read valid input unit', function () {
        units.forEach((d, i) => {
            assert.equal(convertHandler.getUnit(units[i].toUpperCase()), units[i]);
            assert.equal(convertHandler.getUnit(units[i].toLowerCase()), units[i]);
        })
    })

    test('Error on invalid input unit', function () {
        const input = ['10kgs', '1.5miles', '1pounds', '2/3egfs'];

        input.forEach(d => {
            assert.equal(convertHandler.getUnit(d), 'invalid unit');
        })
    })

    test('Return unit for each valid input unit', function () {
        units.forEach((d, i) => {
            assert.equal(convertHandler.getReturnUnit(d), units[i % 2 === 0 ? i + 1 : i - 1]);
        })
    })

    test('Return the spelled-out unit for each valid input unit', function () {
        units.forEach((d, i) => {
            assert.equal(convertHandler.spellOutUnit(d), bigUnit[i]);
        })
    })

    test('Correct convert gal to L', function() {
        const index = units.indexOf('gal');
        const cte = convertArr[index];
        let liters = 5 * cte;
        assert.equal(convertHandler.convert(5, 'gal'), liters.toFixed(5));
    })

    test('Correct convert L to gal', function() {
        const index = units.indexOf('l');
        const cte = convertArr[index];
        let liters = 5 * cte;
        assert.equal(convertHandler.convert(5, 'l'), liters.toFixed(5));
    })

    test('Correct convert mi to km', function() {
        const index = units.indexOf('mi');
        const cte = convertArr[index];
        let liters = 5 * cte;
        assert.equal(convertHandler.convert(5, 'mi'), liters.toFixed(5));
    })

    test('Correct convert km to mi', function() {
        const index = units.indexOf('km');
        const cte = convertArr[index];
        let liters = 5 * cte;
        assert.equal(convertHandler.convert(5, 'km'), liters.toFixed(5));
    })

    test('Correct convert lbs to kg', function() {
        const index = units.indexOf('lbs');
        const cte = convertArr[index];
        let liters = 5 * cte;
        assert.equal(convertHandler.convert(5, 'lbs'), liters.toFixed(5));
    })

    test('Correct convert kg to lbs', function() {
        const index = units.indexOf('kg');
        const cte = convertArr[index];
        let liters = 5 * cte;
        assert.equal(convertHandler.convert(5, 'kg'), liters.toFixed(5));
    })
});