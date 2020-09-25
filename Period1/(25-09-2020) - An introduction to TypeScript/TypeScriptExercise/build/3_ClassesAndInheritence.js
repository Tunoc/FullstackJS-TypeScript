"use strict";
/*
    Classes and Inheritance
    ES2015 and ES-next have added classes and inheritance to JavaScript somehow (but ONLY somehow) similar to what we know from Java.

    Alternative to this exercise: If you come to like the functional style of programming,
    you could implement this example using Type Aliases as explained by Hejlsberg in his video (43min)

    TypeScript, however, adds a lot of extras to this topic, which this exercise should demonstrate.
    Make sure to observe the following:
        A top-level interface IShape, to define the Shape class.
        The constructor shorthand to automatically create properties
        All of the Access Modifiers public, private, protected (and perhaps also readonly)
        Abstract
        Static (make a counter that counts the total number of instances)

    A) The declaration below defines a Shape class, which as it's only properties has a color field +  a
    getArea() and a getPerimeter() function which both returns undefined. This is the closest we get to an abstract method in Java.
        abstract class Shape {
            private _color:string;
            constructor(color:string){
                this._color = color;
            }
            abstract get area():number;
            abstract get perimeter(): number;
        }
    Provide the class with a nice (using template literals) toString() method  + a getter/setter for the colour property.
    Verify that you cannot (why) make an instance of this class.

    B) Create a new class Circle that should extend the Shape class.
    Provide the class with:
        A radius field
        A constructor that takes both colour and radius.
        Overwritten versions of the methods defined in the Base
        Getter/Setter for radius
    Test the class constructor, the getters/setters and the three methods.

    C) Create a new class Cylinder (agreed, definitely not a perfect inheritance example) that should extend the Circle class.
    Provide the class with:
        A height field
        A constructor that takes colour, radius and height.
        Overwritten versions of relevant methods defined in the Base (getter for perimeter should throw "not implemented")
        A getVolume() method  (or better, a getter called volume)
        Getter/Setter for height
    Test the new class
*/
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _radius, _height;
//3a 
class Shape {
    constructor(color) {
        this._color = color;
    }
    get color() { return `Get color: ${this._color}`; }
    set color(color) { this._color = color; }
    toString() { return `Color: ${this._color} \nArea: ${this.area} \nPerimiter: ${this.perimeter}`; }
}
//let test = new Shape();//We can not make a instance of this class because it is an abstract class.
//3b
class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        _radius.set(this, void 0);
        __classPrivateFieldSet(this, _radius, radius);
    }
    get area() {
        return Math.PI * Math.pow(__classPrivateFieldGet(this, _radius), 2);
    }
    get perimeter() {
        return (__classPrivateFieldGet(this, _radius) * 2) * Math.PI;
    }
    get radius() { return __classPrivateFieldGet(this, _radius); }
    set radius(radius) { __classPrivateFieldSet(this, _radius, radius); }
}
_radius = new WeakMap();
let demoCircle = new Circle("Green", 5);
// console.log(demoCircle.toString());
// demoCircle.radius = 25;
// console.log(demoCircle.radius);
// console.log(demoCircle.area);
// console.log(demoCircle.perimeter);
//3c
class Cylinder extends Circle {
    constructor(color, radius, height) {
        super(color, radius);
        _height.set(this, void 0);
        __classPrivateFieldSet(this, _height, height);
    }
    get getVolume() {
        return this.area * __classPrivateFieldGet(this, _height);
    }
    get perimeter() {
        throw new Error("Method not implemented.");
    }
    get height() { return __classPrivateFieldGet(this, _height); }
    set height(height) { __classPrivateFieldSet(this, _height, height); }
}
_height = new WeakMap();
let demoCylinder = new Cylinder("green", 5, 5);
console.log(demoCylinder.getVolume);
demoCylinder.height = 10;
console.log(demoCylinder.height);
//# sourceMappingURL=3_ClassesAndInheritence.js.map