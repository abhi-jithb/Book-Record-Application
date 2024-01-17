const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();
/**
  Route: /books 
  Method: GET
  Description: Get all users
  Access: Public
  Parameters: None
  */
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Got all Books ✅",
        data: books,
    });
});

/**
  Route: /books/issued
  Method: GET
  Description: Get all issued books
  Access: Public
  Parameters: None
  */
router.get("/issued", (req, res) => {
    const userWithIssuedBook = users.filter((each) => {
        if (each.issuedBook) return each;
    });

    const issuedBooks = [];

    userWithIssuedBook.forEach((each) => {
        const book = books.find((book) => (book.id === each.issuedBook));
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;
        issuedBooks.push(book);
    });
    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Book Not Issued !!!!!",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Book Found ✅",
        data: issuedBooks,
    });
});



/**
  Route: /books/:id
  Method: GET
  Description: Get usersby their Id
  Access: Public
  Parameters: ID
  */
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not Found!!",
        });
    }
    return res.status(200).json({
        success: true,
        messsage: "Hurrary 🎉 Book Found",
        data: book,
    });
});


module.exports = router;