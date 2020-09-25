import * as _ from "lodash"

/*
    Remember:
    npm install lodash
    npm install @types/lodash
*/

let numbers: number[] = [1, 2, 4, 5];
//Når man deklarere og initialisere på samme linje behøver man ikke at specificere at det skal være et "number".

let shuffeld = _.shuffle(numbers);

let reversed: Array<number> = _.reverse(shuffeld);

console.log(reversed);