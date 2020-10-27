exports.calculator = function () {
    // add, subtract, multiply, divide
    var total = 0;

    function checkIfNumbers(params) {
        if (isNaN(params) || typeof params == "string") {
            throw new Error("Parameter is not a number")
        }
    }

    return {
        addition: function (num) {
            checkIfNumbers(num);
            total = total + num;
        },
        subtract: function (num) {
            checkIfNumbers(num);
            total = total - num;
        },
        multiply: function (num) {
            checkIfNumbers(num);
            total = total * num;
        },
        divide: function (num) {
            checkIfNumbers(num);
            if (num == 0 || total == 0) {
                throw new Error("Attempt to divide by zero")
            }
            total = total / num;
        },
        getTotal: function () {
            return total;
        }

    }
}