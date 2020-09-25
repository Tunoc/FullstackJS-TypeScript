let n1 = 45
let s1 = "Hello Class"

function loggerV1(a: any, b: any) {
    console.log(`Value-1: ${a}, Value-2: ${b}`)
}
//loggerV1(n1,s1);

function loggerV2(a: number, b: string) {
    console.log(`Value-1: ${a}, Value-2: ${b}`)
}
function loggerV2Return(a: number, b: string): string {
    return `Value-1: ${a}, Value-2: ${b}`
}
//loggerV2(n1, s1);

///////////////////////////////////////////////////////////////////

interface IPerson { name: string }
interface IAddress { street: string }

function loggerV3(a: IPerson, b: IAddress) {
    console.log(`Value-1: ${a.name}, Value-2: ${b.street}`)
}

// Duck typing
//loggerV3({ name: "Kurt Wonnegut" }, { street: "Lyngbyvej 67" })

///////////////////////////////////////////////////////////////////

class Address implements IAddress {
    //private _name : String;
    private _street: string
    constructor(street: string) { this._street = street }
    get street(): string { return this._street }
    set street(street: string) { this._street = street }
    toString(): string { return this._street }
}

class Person implements IPerson {
    //private _name : String;
    #name: string
    constructor(name: string) { this.#name = name }
    get name(): string { return this.#name }
    set name(name: string) { this.#name = name }
    toString(): string { return this.#name }
}

let p1 = new Person("Kurt Wonnegut");
let a1 = new Address("Lyngbyvej 45");

//loggerV3(p1, a1);

////////////////////////////////////////////////////////////

//Not the way to do it ----- Too generic - same as first :any.
function loggerV4<T, U>(a: T, b: U) {
    console.log(`Value-1: ${a}, Value-2: ${b}`)
}

//loggerV4(4, "hello");
//loggerV4(p1, a1);
//loggerV4(a1, p1);


//This is what we will like to "do"
// let numbers: Array<number> = [];
// let names: Array<string>
// let results: Array<boolean>

class GenericLogger<T, U>{
    log = (a: T, b: U) => {
        console.log(`Value-1: ${a}, Value-2: ${b}`)
    }
}

const numberLogger = new GenericLogger<number, number>();
const personAddressLogger = new GenericLogger<IPerson, IAddress>();

numberLogger.log(34, 56); //Can't take strings.
personAddressLogger.log(p1, a1); //Can't take other things than IPerson and IAddress.