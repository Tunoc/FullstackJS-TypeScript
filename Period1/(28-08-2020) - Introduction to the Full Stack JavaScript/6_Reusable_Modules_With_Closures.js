/*
    Reusable Modules with Closures
    Read: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

    1) Implement and test the Closure Counter Example from today's lecture

    2) Implement a reusable function using the closure feature, that should encapsulate information about a person (name, and age) and returns an object with the following methods:
    setAge
    setName
    getInfo (should return a string like Peter, 45)

    3) Implement an ES6 class with a similar functionality as requested in part 2. Don't use getXX or  setXX but use ES6 properties.
*/

//1) Implement and test the Closure Counter Example from today's lecture
//closureuser - (6.1_closuresMakeCounter.js)
const count1 = require("./6.1_closuresMakeCounter")();
const count2 = require("./6.1_closuresMakeCounter")();
const count3 = require("./6.1_closuresMakeCounter")();

//We can count up and down as many times as we want on each of our 3 counters.
count1.inc();
count1.inc();
count2.dec();
count2.dec();
count3.inc();
count3.dec();
console.log("Value from counter 1: " + count1.value());
console.log("Value from counter 2: " + count2.value());
console.log("Value from counter 3: " + count3.value());



/*
    2) Implement a reusable function using the closure feature, that should encapsulate information about a person (name, and age) and returns an object with the following methods:
        setAge
        setName
        getInfo (should return a string like Peter, 45)
*/
//closureuser - (6.2_closuresPersonalInfo.js)
const person1 = require("./6.2_closuresPersonalInfo.js")();
const person2 = require("./6.2_closuresPersonalInfo.js")();
const person3 = require("./6.2_closuresPersonalInfo.js")();

//editPerson checks with typeof, therfore the age has to be int and the name a string, but both work with the same editPerson.
person1.editPerson(45);
person1.editPerson("Peter");
console.log(person1.getInfo());
person2.editPerson(23);
person2.editPerson("Lars");
console.log(person2.getInfo());
person2.editPerson("Karl");
console.log(person2.getInfo());
console.log(person3.getInfo());


/*
    3) Implement an ES6 class with a similar functionality as requested in part 2. Don't use getXX or  setXX but use ES6 properties.
    
    - Not completely sure if this is what the question means?
*/
const { Person } = require("./6.3_closuresPersonClass");

let personClass1 = new Person("Hans Petersen", 57);
let personClass2 = new Person();
console.log(personClass1.nameAndAge());
console.log(personClass2.nameAndAge());