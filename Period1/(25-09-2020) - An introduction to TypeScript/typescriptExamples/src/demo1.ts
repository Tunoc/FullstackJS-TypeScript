interface Student {
    firstName: string;
    lastName: string;
}

function greeter(person: Student) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Tunoc", lastName: "Mukiko" };

console.log(greeter(user));