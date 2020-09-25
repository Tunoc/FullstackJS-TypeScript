"use strict";
/**
    Interfaces 1
        a) Create a TypeScript interface IBook, which should encapsulate information about a book, including:
            title, author:  all strings
            published: Date
            pages: number
        b) Create a function that takes an IBook instance and test it with an object instance.
        c) Given the example above, explain what is meant by the term Duck Typing, when TypeScript interfaces are discussed.
        d) Change the interface to make published and pages become optional - Verify the new behaviour.
        e) Change the interface to make author readonly - Verify the new behaviour.
        f) Create a class Book and demonstrate the "Java way" of implementing an interface.
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
var _title, _author, _published, _pages;
//1b
let book1 = { title: "500 Words You Should Know", author: "Caroline Taggart", published: new Date("2014-9-25"), pages: 192 };
function printBook(a) {
    console.log(`Title: ${a.title} \nAuthor: ${a.author} \npublished: ${a.published} \npages: ${a.pages}`);
}
//printBook(book1);
/* 1c
    Duck typing is like the term; "If it walks like a duck and it quacks like a duck, then it must be a duck".
    This means that our book1 has all the same properties, and value types, as our iBook interface.
    And therfore the system assumes that it has to be a IBook.
*/
//1d - added "?" in the interface to mark the 2 optional fields. They print as undefined.
let book2 = { title: "500 Words You Should Know", author: "Caroline Taggart" };
//printBook(book2);
//1e - added the "readonly" on the author.
let book3 = { title: "500 Words You Should Know", author: "Caroline Taggart", published: new Date("2014-9-25"), pages: 192 };
//book3.author = "Another author"//As we see here. We are told that there is an error since author is a read only.
//1f - Added the #. <- Could also have used the old way with "private _title" and so on.
class Book {
    constructor(title, author, published, pages) {
        _title.set(this, void 0);
        _author.set(this, void 0);
        _published.set(this, void 0);
        _pages.set(this, void 0);
        __classPrivateFieldSet(this, _title, title);
        __classPrivateFieldSet(this, _author, author);
        __classPrivateFieldSet(this, _published, published);
        __classPrivateFieldSet(this, _pages, pages);
    }
    //Single getters.
    get title() { return __classPrivateFieldGet(this, _title); }
    get author() { return __classPrivateFieldGet(this, _author); }
    get published() { return __classPrivateFieldGet(this, _published); }
    get pages() { return __classPrivateFieldGet(this, _pages); }
    //Grouped getters.
    get tA() { return `Title: ${__classPrivateFieldGet(this, _title)} \nAuthor: ${__classPrivateFieldGet(this, _author)}`; }
    get tAP() { return `Title: ${__classPrivateFieldGet(this, _title)} \nAuthor: ${__classPrivateFieldGet(this, _author)} \npublished: ${__classPrivateFieldGet(this, _published)}`; }
    get tAPP() { return `Title: ${__classPrivateFieldGet(this, _title)} \nAuthor: ${__classPrivateFieldGet(this, _author)} \npublished: ${__classPrivateFieldGet(this, _published)} \npages: ${__classPrivateFieldGet(this, _pages)}`; }
    //Setter
    set title(title) { __classPrivateFieldSet(this, _title, title); }
    set published(published) { __classPrivateFieldSet(this, _published, published); }
    set pages(pages) { __classPrivateFieldSet(this, _pages, pages); }
}
_title = new WeakMap(), _author = new WeakMap(), _published = new WeakMap(), _pages = new WeakMap();
//With optional parameters.
let book4 = new Book("TestBookName", "TestAuthorName", new Date(), 159753);
//Without optional parameters.
let book5 = new Book("TestBookName2", "TestAuthorName2");
console.log(book4.title);
console.log(book4.published + "\n");
book4.title = "TitleWasEdited";
console.log(book4.tAPP);
console.log(book5.tAPP);
//# sourceMappingURL=1_Interfaces.js.map