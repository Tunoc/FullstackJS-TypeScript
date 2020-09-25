/*
    2) Implement user defined functions that take callbacks as an argument
    Assume the JavaScript-array did not offer the filter method. Then you could implement it by yourself.

    a) Implement a function: myFilter(array, callback)that takes an array as the first argument,
    and a callback as the second and returns a new (filtered) array according to the code provided in the callback
    (that is with the same behaviour as the original filter method).

    Test the method with the same array and callback as in the example with the original filter method.
*/

//function myFilter(array, callback());
function myFilter(array, callback) {
    let returnArray = [];
    array.forEach(element => {
        callback(element) && returnArray.push(element);
    });
    return returnArray;
};

//Arrays
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const numbers = [1, 3, 5, 7, 9, 753951];

//Filter Callbacks
var wordsLongerThan6 = (word) => {
    return word.length > 6;
}
var numbersBetween4And11 = (number) => {
    return number > 4 && number < 11;
}

//Filter example - My filter
const myFilterExample = myFilter(words, wordsLongerThan6)
const abc = myFilter(words, word => word.length > 6);
const def = myFilter(numbers, numbersBetween4And11);
console.log(myFilterExample);
console.log(abc);
console.log(def);

//Filter example - Original
const result = words.filter(word => word.length > 6);
const ghi = words.filter(wordsLongerThan6);
const jkl = numbers.filter(numbersBetween4And11);
console.log(result);
console.log(ghi);
console.log(jkl);