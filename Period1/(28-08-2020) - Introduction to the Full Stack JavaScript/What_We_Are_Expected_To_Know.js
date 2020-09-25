/*
    Basic JavaScript and an understanding of the DOM
    var, let and const
    map, filter, join and (perhaps) reduce
    Spread Operator and destructuring arrays and objects in JavaScript
    React
*/

/*
    var: The var statement declares a function-scoped or globally-scoped variable, optionally initializing it to a value.
    let: The let statement declares a block-scoped local variable, optionally initializing it to a value.
    const: Constants are block-scoped, much like variables defined using the let keyword. The value of a constant can't be changed through reassignment, and it can't be redeclared.
*/


//  map: The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log(map1);

//  filter: The filter() method creates a new array with all elements that pass the test implemented by the provided function.
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);

/*
    join: The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object),
    separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
*/
const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join());
// expected output: "Fire,Air,Water"
console.log(elements.join(''));
// expected output: "FireAirWater"
console.log(elements.join('-'));
// expected output: "Fire-Air-Water"

//  reduce: The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
const array2 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10
// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15