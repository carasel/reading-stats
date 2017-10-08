"use strict";

const calculateTopAuthors = function(books) {
    let authors = [];
    books.forEach((book) => {
        const authorName = book.book.authors.author.name;
        const authorIndex = authors.findIndex(x => x.author === authorName);
        if(authorIndex === -1){ // new author
            let author = {
                "author": authorName,
                "count": 1
            };
            authors.push(author);
        } else {
            ++authors[authorIndex].count;
        }
    });

    authors.sort((a,b) => {
        if (a.count > b.count) return -1;
        else return 1;
    });

    console.log(authors);
    return(authors);
};

const getHighestRated = function(books, number) {
    books.sort((a,b) => {
        const ratingA = a.book.average_rating;
        const ratingB = b.book.average_rating;
        if(ratingA > ratingB) return -1;
        else return 1;
    });

    let smallBooks = [];

    books.slice(0,number).forEach((book) => {
        const smallBook = {
            "title": book.book.title,
            "author": book.book.authors.author.name,
            "average_rating": book.book.average_rating,
            "user_rating": book.rating
        };
        smallBooks.push(smallBook);
    });

    console.log(smallBooks);
    return smallBooks;
};

module.exports = {
    calculateTopAuthors: calculateTopAuthors,
    getHighestRated: getHighestRated
};