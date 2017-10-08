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

module.exports = {
    calculateTopAuthors: calculateTopAuthors
};