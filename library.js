class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    info () {
        return `This book is ${this.title} by ${this.author}, and is ${this.pages} 
        pages long.`
    }
}

class Comic extends Book {   //adding a fun extra class
    constructor(title, author, pages, artist) {
        super(title, author, pages);  //this inherits from the parent Book class
        this.artist = artist;
    }
    info () {
        return `This comic is ${this.title}, written by ${this.author} and illustrated 
        by ${this.artist}, and is ${this.pages} pages long.`
    }
} 

class Shelf {
    constructor(name) {
        this.name = name;
        this.books = [];     //array for books added
    }
    addBook(book) {
        if (book instanceof Book || book instanceof Comic) {
            this.books.push(book);
        } else {
            throw new Error(`You can only add an instance of Book! 
            Response is not a book: ${book}`);   //catches any errors of not books
        }
    }
    info () {
        if (this.books.length === 0) {   //no books, diff. message
            return `There are no books on this shelf. Add some!`
        }
        return `This ${this.name} shelf has ${this.books.length} book(s) on it. Yay!`
    }
}

class Menu { 
    constructor() {
        this.shelves = [];
        this.selectedShelf = null; // in order to handle one shelf at a time
    }
    
    start() { 
        let selection = this.showMainMenuOptions(); 
        while (selection != 0) {
            switch(selection) {    
                case '1' :
                    this.addShelf();
                    break;
                case '2' :
                    this.viewShelf();
                    break;
                case '3' :
                    this.displayShelves();
                default:
                    selection = 0;
                }
            selection = this.showMainMenuOptions();
        }
        alert('Later, alligator!');
    }
    
    
    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) add a shelf
            2) view a shelf and add/remove books
            3) display all shelves
        `);
    }
    
    
    showShelfMenuOptions(shelfInfo) {
        return prompt(`
            0) back
            1) add a new book
            2) delete a book
            -----------------
            ${shelfInfo}
        `);
    }
    showBookMenuOptions() {
        return prompt(`
            0) back
            1) add a new book
            2) add a new comic
        `);
    }
    
    viewShelf() {
        let index = prompt("Enter the index of the shelf that you want to view:");
        if (index > -1 && index < this.shelves.length) {
            this.selectedShelf = this.shelves[index];
            let description = 'Shelf name: ' + this.selectedShelf.name + '\n';
            description += ' ' + this.selectedShelf.info() + '\n ';
            for (let i = 0; i < this.selectedShelf.books.length; i++) {
                description += i + ') ' + this.selectedShelf.books[i].info() + '\n';
            }
            let selection1 = this.showShelfMenuOptions(description);
                switch (selection1) {
                    case '1' :
                        this.addBook();
                        break;
                    case '2' :
                        this.deleteBook();
                    }
        } 
    }

    addShelf() {
        let name = prompt('Enter a name for the new shelf: ');
        this.shelves.push(new Shelf(name));  //this adds a new named shelf
    }
    
    addBook() {
       let selection2 = this.showBookMenuOptions(); 
            switch (selection2) {    
                case '1' :
                    this.addWordy();    //diff. between a "normal" book and a comic
                    break;
                case '2' :
                    this.addComic();
            }   
    }
    addWordy() {
        let title = prompt('Enter the title of new book: ');
        let author = prompt('Enter author of new book: ');
        let pages = prompt('Enter the number of pages: ')
        this.selectedShelf.addBook(new Book(title, author, pages));
    }
    
     addComic () {
        let title = prompt('Enter the title of new book: ');
        let author = prompt('Enter author of new book: ');
        let pages = prompt('Enter the number of pages: ');
        let artist = prompt('Enter the name of the illustrator: ');
        this.selectedShelf.addBook(new Comic(title, author, pages, artist));
    } 

    deleteBook() {
        let index = prompt('Enter the index of the book you want to delete: ');
        if (index > -1 && index < this.selectedShelf.books.length) { 
            this.selectedShelf.books.splice(index,1);
        }
    }

    displayShelves() {
        let shelfString = '';
            for (let i = 0; i < this.shelves.length; i++) {
            shelfString += i+ ': The ' + this.shelves[i].name + ' shelf has ' + 
            this.shelves[i].books.length + ' book(s) on it.' + '\n';
            }
        alert(shelfString);
    }
}
    
let menu = new Menu();
menu.start();