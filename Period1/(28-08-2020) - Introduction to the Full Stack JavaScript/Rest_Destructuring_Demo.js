let a, b, rest;
[a, b] = [10, 20];

console.log("a value: " + a);

console.log("b value: " + b);

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log("Rest values: " + rest);
