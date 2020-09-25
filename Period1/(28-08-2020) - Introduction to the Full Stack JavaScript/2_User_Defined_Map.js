/*
    2) Implement user defined functions that take callbacks as an argument

    b) Implement a function: myMap(array, callback)that, provided an array and a callback,
    provides the same functionality as calling the existing map method on an array.

    Test the method with the same array and callback as in the example with the original map method.
*/

//function myMap(array, callback());
function myMap(array, callback) {
    let returnArray = [];
    array.forEach(element => {
        let temp = callback(element);
        returnArray.push(temp);
    });
    return returnArray;
};

//Arrays
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const numbers = [1, 3, 5, 7, 9, 753951];

//Map Callbacks
var reverseWord = (word) => {
    return word.split('').reverse().join('');
}
var multiplyBy5 = (number) => {
    return number * 5;
}

//Map example - My maps
const myMapExample = myMap(numbers, x => x * 2);
const abc = myMap(numbers, multiplyBy5);
const def = myMap(words, reverseWord);
console.log(myMapExample);
console.log(abc);
console.log(def);

//Map example - Original
const result = numbers.map(x => x * 2);
const ghi = numbers.map(multiplyBy5);
const jkl = words.map(reverseWord);
console.log(result);
console.log(ghi);
console.log(jkl);
