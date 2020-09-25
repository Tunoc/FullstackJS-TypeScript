/*
    Interfaces 2 (Function types)
        a) Create an interface to describe a function: myFunc that should take three string parameters and return a String Array.
        b) Design a function "implementing" this interface which returns an array with the three strings
        c) Design another implementation that returns an array, with the three strings uppercased.
        d) The function, given below, uses the ES-6 (and TypeScript) feature for destructuring Arrays into individual variables, to simulate a method that uses the interface.
        let f2 = function logger(f1: myFunc){
            //Simulate that we get data from somewhere and uses the provided function
            let [ a, b, c] = ["A", "B", "C"];
            console.log(f1(a,b,c));
        }
        e) Test f2 with the two implementations created in b+c.
        f) Verify that f2 cannot be used with functions that do not obey the myFunc interface
*/

//2a
interface myFunc {
    (
        str1: string,
        str2: string,
        str3: string
    ): string[]
}

//2b
let arrayFromStrings: myFunc = function (str1: string, str2: string, str3: string) {
    return Array.from(arguments);
}
//console.log(arrayFromStrings("a", "b", "c"));

//2c
let arrayFromStringsUpperCase: myFunc = function (str1: string, str2: string, str3: string) {
    let strArray = Array.from(arguments);
    return strArray.map(str => str.toUpperCase());
}
//console.log(arrayFromStringsUpperCase("a", "b", "c"));

//2d
let f2 = function logger(f1: myFunc) {
    //Simulate that we get data from somewhere and uses the provided function
    let [a, b, c] = ["Aa", "Bb", "Cc"];
    console.log(f1(a, b, c));
}

//2e
f2(arrayFromStrings)
f2(arrayFromStringsUpperCase)

//2f
let thisShouldFail = function (notAString: number, noStringEither: undefined, stillNoString: boolean) {
    return Array.from(arguments);
}
/*
    The f2 below fails because the; "ThisShouldFail" function isn't an instance of our interface.
    And we can't implement the interface on the "ThisShouldFail" because there aren't any strings.
*/
//f2(thisShouldFail);

