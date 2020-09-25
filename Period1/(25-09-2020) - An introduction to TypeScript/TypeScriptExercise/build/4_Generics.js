"use strict";
/*
    Generics
        a) Implement a generic function which will take an array of any kind, and return the array reversed
        (just use the built-in reverse function), so the three first calls below will print the reversed array,
        and the last call will fail.
            console.log(reverseArr<string>(["a","b","c"]));
            console.log(reverseArr<number>([1,2,3]));
            console.log(reverseArr<boolean>([true,true,false]));
            console.log(reverseArr<number>(["a","b","c"]));

        b) Implement a generic Class DataHolder that will allow us to create instances as sketched below:
            let d = new DataHolder<string>("Hello");
            console.log(d.getValue());
            d.setValue("World");
            console.log(d.getValue());

            let d2 = new DataHolder<number>(123);
            console.log(d2.getValue());
            d2.setValue(500);
            console.log(d2.getValue());

        Verify that once created, an instance can only be used with the type it was created from.

        c) Rewrite the example above to user getters and setters instead of the silly getXX and setXX methods
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
var _value;
//4a
function reverseArr(arr) {
    return arr.reverse();
}
// console.log(reverseArr<string>(["a", "b", "c"]));
// console.log(reverseArr<number>([1, 2, 3]));
// console.log(reverseArr<boolean>([true, true, false]));
// console.log(reverseArr<number>(["a", "b", "c"]));
//4b
class DataHolder {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
}
// let d = new DataHolder<string>("Hello");
// console.log(d.getValue());
// d.setValue("World");
// console.log(d.getValue());
// //d.setValue(50);//This will fail
// let d2 = new DataHolder<number>(123);
// console.log(d2.getValue());
// d2.setValue(500);
// console.log(d2.getValue());
// //d2.setValue("This Will Fail");
//4c
class BetterDataHolder {
    constructor(value) {
        _value.set(this, void 0);
        __classPrivateFieldSet(this, _value, value);
    }
    get value() { return __classPrivateFieldGet(this, _value); }
    set value(value) { __classPrivateFieldSet(this, _value, value); }
}
_value = new WeakMap();
// let d = new BetterDataHolder<string>("Hello");
// console.log(d.value);
// d.value = "World";
// console.log(d.value);
// let d2 = new BetterDataHolder<number>(123);
// console.log(d2.value);
// d2.value = 500;
// console.log(d2.value);
//# sourceMappingURL=4_Generics.js.map