/*
    The reduce-method

    In most literature (definitely not only JavaScript) you will see map and filter explained together with the reduce function
    (try to google map filter and reduce), so obviously, this is a method we need to learn.

    Reduce is used to reduce an array into a single item (a number, string, object, etc).
    This is a very common problem in all languages. For some specific problems,
    so common that the array actually has a specific “reduce” function called join,
    which can reduce an array into a string separated by whatever we choose.

    var all= ["Lars", "Peter", "Jan", "Bo"];

    a) Use join to create a single string from all, with names: comma-, space. and  # - separated.
*/

//Array
var all = ["Lars", "Peter", "Jan", "Bo"];

//Single string, with ", #"
const namesInOneString = (array) => {
    array[0] = "#" + array[0];
    const result = array.join(", #");
    return result;

}
console.log(namesInOneString(all));



/*
    b) Given this array: var numbers = [2, 3, 67, 33];

    Create a reducer function that will return the sum (105) of all values in numbers
*/
//Array
var numbers = [2, 3, 67, 33];

//Reducer function
const sumOfNumbersReduce = (array) => {
    return array.reduce(addAllValues);
};

//callbacks
var addAllValues = (acc, curVal) => {
    return acc + curVal;
}

//Reducer example
const sumOfNumbers = sumOfNumbersReduce(numbers);
console.log(sumOfNumbers);



/*
    c)  Given this array:
        let members = [
            {name : "Peter", age: 18},
            {name : "Jan", age: 35},
            {name : "Janne", age: 25},
            {name : "Martin", age: 22},
        ]

    Create a reducer function that will return the average age of all members.
    
    Hint: The reduce callback takes two additional arguments as sketched below:
    var reducer = function(accumulator, member,index,arr ){
    Index is the current index for which the value (member) are passed in, and arr is the array.
    Use this to return different values from your reduce-function,  according to whether you have reached the last element or not.
*/
//Array of objects
const members = [
    { name: "Peter", age: 18 },
    { name: "Jan", age: 35 },
    { name: "Janne", age: 25 },
    { name: "Martin", age: 22 },
]

//Reducer function
const reduceAgeFunctionReduce = (array, callbackFunction) => {
    return array.reduce(callbackFunction, 0);
};

//callbacks
var avgAge = (acc, curVal, idx, arr) => {
    return acc + (curVal.age / arr.length);
}

//Reducer example
const reduceFunction = reduceAgeFunctionReduce(members, avgAge);
console.log(reduceFunction);


/*
    d)       Imagine you were to create a system that could count votes for the presidential election in USA.
    Given this array of votes:

        var votes = [ "Clinton","Trump","Clinton","Clinton","Trump","Trump","Trump","None"];

    Create a reduce function that will return a single object like {Clinton: 3, Trump: 4, None: 1 }

    Hints: You can check whether a property exists in a JavaScript, and add new properties as sketched below:

    var a = {}
    if (a["clinton"])
        console.log("I Will Not Print")
        a["clinton"] = 1;
    console.log("You will see me")
    console.log("Value of clinton "+ a["clinton"]);
*/
//Array
var votes = ["Clinton", "Trump", "Clinton", "Clinton", "Trump", "Trump", "Trump", "None"];

//Reduce function
const presidentSelect = (callbackFunction) => {
    return votes.reduce(callbackFunction, {});
}

//Callbacks
var presidentialCount = (acc, candidate) => {
    //If true, increate accumolator if exist in dictionary. If false, add them to dictionary.
    acc[candidate] ? acc[candidate] += 1 : acc[candidate] = 1;
    // if (acc[candidate]) {
    //     acc[candidate] += 1; //Increase accumulator if exist in dictionary
    // } else {
    //     acc[candidate] = 1; //Add to accumolator if dosn't exist in dictionary
    // }
    return acc;
}

//Reducer example
const candidateSelection = presidentSelect(presidentialCount);
console.log(candidateSelection);


