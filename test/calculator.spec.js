var Calculator = require('../src/calculator').Calculator;

describe('Calculator', () => {
   it('should add numbers', () => {
       let calculator = new Calculator();
       let sum = calculator.add(2, 2);
       expect(sum).toBe(4);
   });
});