class Person {
    constructor(name = "No name given", age = "No age given") {
        this.name = name;
        this.age = age;
    }
    //Getter
    get info() {
        return this.nameAndAge();
    }
    //Method
    nameAndAge() {
        return `${this.name}, ${this.age}`;
    }
}
exports.Person = Person;
;
