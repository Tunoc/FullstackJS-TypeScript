/*
    3) Using the Prototype property to add new functionality to existing objects

    Every JavaScript function has a prototype property (this property is empty by default),
    and you can attach properties and methods on this prototype property.
    You add methods and properties on an object’s prototype property to make those methods and
    properties available to all instances of that Object. You can even implement (classless) inheritance hierarchies with this property.

    The problem with our two user defined functions above (myFilter and myMap) is that they are not really attached to the Array Object.
    They are just functions, where we have to pass in both the array and the callback.

    Create a new version of the two functions (without the array argument) which you should add to the Array prototype property
    so they can be called on any array as sketched below:

    var names = ["Lars", "Peter", "Jan", "Bo"];
    var newArray = names.myFilter(function(name) {…});
*/

//Map and Filter functions
function myFilter(array, callback) {
    let returnArray = [];
    array.forEach(element => {
        callback(element) && returnArray.push(element);
    });
    return returnArray;
};
function myMap(array, callback) {
    let returnArray = [];
    array.forEach(element => {
        let temp = callback(element);
        returnArray.push(temp);
    });
    return returnArray;
};

//Array Prototype
Array.prototype.myFilter = function myFilter(callback) {
    let returnArray = [];
    this.forEach(element => {
        callback(element) && returnArray.push(element);
    });
    return returnArray;
};
Array.prototype.myMap = function myMap(callback) {
    let returnArray = [];
    this.forEach(element => {
        let temp = callback(element);
        returnArray.push(temp);
    });
    return returnArray;
};

//Arrays
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const numbers = [1, 3, 5, 7, 9, 753951];

//Map Callbacks
var reverseWordMap = (word) => {
    return word.split('').reverse().join('');
}
var multiplyBy5Map = (number) => {
    return number * 5;
}
//Filter Callbacks
var wordsLongerThan6Filter = (word) => {
    return word.length > 6;
}
var numbersBetween4And11Filter = (number) => {
    return number > 4 && number < 11;
}

//Map & Filter examples
const wordsLongerThan6 = words.myFilter(wordsLongerThan6Filter);
console.log(wordsLongerThan6);

const reverseWord = words.myMap(reverseWordMap);
console.log(reverseWord);

const numbersBetween4And11 = numbers.myFilter(numbersBetween4And11Filter);
console.log(numbersBetween4And11);

const multiplyBy5 = numbers.myMap(multiplyBy5Map);
console.log(multiplyBy5);


