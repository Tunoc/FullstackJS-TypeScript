/*
    this in JavaScript

    Team up with another member in the class. Read about this in JavaScript and implement at least three examples (individually)
    to illustrate how this in JavaScript differs from what we know from Java.
    One of the examples should include an example of explicit setting this using either call(), apply() or bind().
    Explain to each other, using the examples (as if it was the exam):
        How this in JavaScript differ from this in Java
        Why we (because we did not explain about this) followed a pattern in our third semester controller and stored a reference to this (var self = this)
        The purpose of the methods call(), apply() and bind()

        https://www.codementor.io/@niladrisekhardutta/how-to-call-apply-and-bind-in-javascript-8i1jca6jp
*/
var person = {
    firstName: "John",
    lastName: "Doe",
    id: 5566,
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
};
console.log(person.fullName());

console.log(globalThis);



/*
    How this in JavaScript differ from this in Java
    https://www.codementor.io/@dariogarciamoya/understanding--this--in-javascript-du1084lyn?icn=post-8i1jca6jp&ici=post-du1084lyn

    This is different is JS than java, because the this keyword refers to an object, that witch is executing the current bit of JavaScript code.
    In other words, every javascript function while executing, has a reference to its current execution context, called this.
    Execution context means here is how the function is called.
*/

/*
    Why we (because we did not explain about this) followed a pattern in our third semester controller and stored a reference to this (var self = this)

    For at binde objektet og kalde det ude fra.
*/


/*
    The purpose of the methods call(), apply() and bind()
    https://www.codementor.io/@niladrisekhardutta/how-to-call-apply-and-bind-in-javascript-8i1jca6jp

    You can use call()/apply() to invoke the function immediately.
    bind() returns a bound function that, when executed later, will have the correct context ("this") for calling the original function.
    So bind() can be used when the function needs to be called later in certain events when it's useful.
*/