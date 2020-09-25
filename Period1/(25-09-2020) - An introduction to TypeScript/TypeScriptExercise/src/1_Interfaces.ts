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

//1a
interface IBook {
    title: string,
    readonly author: string,
    published?: Date,
    pages?: number,
}

//1b
let book1 = { title: "500 Words You Should Know", author: "Caroline Taggart", published: new Date("2014-9-25"), pages: 192 }
function printBook(a: IBook): void {
    console.log(`Title: ${a.title} \nAuthor: ${a.author} \npublished: ${a.published} \npages: ${a.pages}`)
}
//printBook(book1);

/* 1c
    Duck typing is like the term; "If it walks like a duck and it quacks like a duck, then it must be a duck".
    This means that our book1 has all the same properties, and value types, as our iBook interface.
    And therfore the system assumes that it has to be a IBook.
*/

//1d - added "?" in the interface to mark the 2 optional fields. They print as undefined.
let book2: IBook = { title: "500 Words You Should Know", author: "Caroline Taggart" }
//printBook(book2);

//1e - added the "readonly" on the author.
let book3: IBook = { title: "500 Words You Should Know", author: "Caroline Taggart", published: new Date("2014-9-25"), pages: 192 }
//book3.author = "Another author"//As we see here. We are told that there is an error since author is a read only.

//1f - Added the #. <- Could also have used the old way with "private _title" and so on.
class Book implements IBook {
    #title: string
    #author: string
    #published?: Date | undefined
    #pages?: number | undefined
    constructor(title: string, author: string, published?: Date | undefined, pages?: number | undefined) {
        this.#title = title
        this.#author = author
        this.#published = published
        this.#pages = pages
    }
    //Single getters.
    get title(): string { return this.#title }
    get author(): string { return this.#author }
    get published(): Date | undefined { return this.#published }
    get pages(): number | undefined { return this.#pages }
    //Grouped getters.
    get tA(): string { return `Title: ${this.#title} \nAuthor: ${this.#author}` }
    get tAP(): string { return `Title: ${this.#title} \nAuthor: ${this.#author} \npublished: ${this.#published}` }
    get tAPP(): string { return `Title: ${this.#title} \nAuthor: ${this.#author} \npublished: ${this.#published} \npages: ${this.#pages}` }
    //Setter
    set title(title: string) { this.#title = title }
    set published(published: Date | undefined) { this.#published = published }
    set pages(pages: number | undefined) { this.#pages = pages }
}

//With optional parameters.
let book4 = new Book("TestBookName", "TestAuthorName", new Date(), 159753);
//Without optional parameters.
let book5 = new Book("TestBookName2", "TestAuthorName2");
console.log(book4.title);
console.log(book4.published + "\n");

book4.title = "TitleWasEdited"
console.log(book4.tAPP);
console.log(book5.tAPP)

