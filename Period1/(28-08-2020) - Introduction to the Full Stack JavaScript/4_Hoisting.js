/*
    Hoisting

    Team up with another member in the class and implement at least two examples to illustrate that:
        Function declarations are completely hoisted
        var declarations are also hoisted, but not assignments made with them
    Explain to each other (as if it was the exam):
        What hoisting is
        A design rule we could follow when using var, now we know about hoisting
*/

/*
    Function declarations are completely hoisted
    var declarations are also hoisted, but not assignments made with them
    
    Even though we called the function before declaring it in the script, it is able to log our message to the console.
    This happens because all function declarations are completely hoisted. 
    That means that the interpreter moved all the declarations to the top of the file and started reading them before the rest.
    Hoist = raise.(We raise the code to the top).
*/

hoisted1();
function hoisted1() {
    console.log("This function has been hoisted");
}
//The reason why hoisted2 is undefined is because the variable hoisted2 was hoisted.
console.log(hoisted2);
var hoisted2 = "This variable has been hoisted";
/*
To show how the interpreter reads the code above. This will explain why the code is undefined.
The reason for the console.log to be undefined is because the system knows that there is a declared variable.
However that variable hasn't been assigned yet. That first happens after the console.log, and therfor it is undefined.

var hoisted2;                                       //Declaration
console.log(hoisted2); - prints undefined.          //Returns undefined
hoisted2 = "This variable has been hoisted";        //Initialization
*/



/*
What hoisting is?
Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.
*/

/*
A design rule we could follow when using var, now we know about hoisting

We could code our code the way the interpreter reads our JS code.
Declaring our variables at the top of our global- and function- scopes.
*/