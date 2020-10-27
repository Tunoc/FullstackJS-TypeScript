var expect = require("chai").expect;
var assert = require("chai").assert;
var calculator = require("../lib/calculator");

describe("Calculator four standard arithmetic operations", function () {
    var calc;

    beforeEach(function () {
        //Calc allways starts at 0
        calc = new calculator.calculator();
    });

    describe("New Calculator Object", function () {
        it("Creates a new calculator object", function () {
            expect(calc).not.to.be.null;
        })
    });

    describe("Addition", function () {
        it("Adds two numbers", function () {
            calc.addition(5); //0+5
            calc.addition(8); //0+5+8
            let total = calc.getTotal();
            expect(total).to.equal(13);
        });

        it("Adds a string", function () {
            const expectingError = function () {
                calc.addition("s");
            }
            expect(expectingError).to.throw(Error, "Parameter is not a number");
        })
    });

    describe("Subtract", function () {
        it("Subtracts two numbers", function () {
            calc.subtract(5); //0-5
            calc.subtract(8); //0-5-8
            let total = calc.getTotal();
            expect(total).to.equal(-13);
        });

        it("Subtract a string", function () {
            const expectingError = function () {
                calc.subtract("s");
            }
            expect(expectingError).to.throw(Error, "Parameter is not a number");
        })
    });

    describe("Multiply", function () {
        it("Multiply 5 by 2", function () {
            calc.addition(5); //0+5
            calc.multiply(2); //5*2
            let total = calc.getTotal();
            expect(total).to.equal(10);
        });

        it("Multiply a string", function () {
            const expectingError = function () {
                calc.addition(5);
                calc.multiply("2");
            }
            expect(expectingError).to.throw(Error, "Parameter is not a number");
        })
    });

    describe("Divide", function () {
        it("Divide 10 by 2", function () {
            calc.addition(10); //0+10
            calc.divide(2); //10/2
            let total = calc.getTotal();
            expect(total).to.equal(5);
        });

        it("Divide a string", function () {
            const expectingError = function () {
                calc.addition(10);
                calc.divide("2");
            }
            expect(expectingError).to.throw(Error, "Parameter is not a number");
        })

        it("Divide a by 0", function () {
            try {
                calc.addition(5);
                calc.divide(0);
            } catch (err) {
                expect(err.message).to.equal("Attempt to divide by zero");
            }
        })
    });
});