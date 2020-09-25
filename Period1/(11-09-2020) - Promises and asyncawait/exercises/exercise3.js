// Execution in serial 
//     Use ​fetch ​and ​async/await​ to complete ​fetchPerson(..)​below. 
//     When implemented, each line in ​printNames()​ must be executed “sequentially”. 
//     ​Verify this with the debugger​.

const { default: fetch } = require("node-fetch");
var now = require("performance-now")
const URL = "https://swapi.dev/api/people/";
async function fetchPerson(url) {
    return await (await fetch(url)).json() //One liner for .json()/response & data - 2 await.
    /*
    let response = await fetch(url) // <-Awaits response
    return await response.json()    // <-Awaits data
    */
}

async function printNamesSequential() {
    console.log("Before");
    var start = now();
    const person1 = await fetchPerson(URL + '1');
    const person2 = await fetchPerson(URL + '2');
    var end = now();
    console.log(person1.name);
    console.log(person2.name);
    console.log("After all");
    console.log((end - start).toFixed(3));
}
//printNamesSequential(); //Lowest mesured time sequential 350.000 ish

async function printNamesParallel() {
    console.log("Before");
    var start = now();
    const person1 = fetchPerson(URL + '1');
    const person2 = fetchPerson(URL + '2');
    let promises = await Promise.all([person1, person2])
    var end = now();
    console.log(promises[0].name);
    console.log(promises[1].name);
    console.log("After all");
    console.log((end - start).toFixed(3));
}
//printNamesParallel(); //Lowest mesured time parallel 235.000 ish