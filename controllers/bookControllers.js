import Book from "../models/bookModel.js";

// getAllBooks()
// getNumOfBooks()// only admin
// addBook()// only admin
// deleteBook()// only admin
// upDateBook()// only admin
// isBookBorrowed()
// getPrice(bookID)

export const addBook = async (req, res) =>{
    try {
        const {name, numOfPage, author, genre, publishedYear, isAvailable, price } = req.body;
    
        const book = new Book({
            name,
            numOfPage,
            author,
            genre,
            publishedYear,
            isAvailable,
            price
        })

        await book.save()
        res.status(200).json({
            message: 'Book added',
            book
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }

}

export const getAllBooks = async (req, res) =>{
    try {
        const books = await Book.find()
        res.status(200).json({
            books
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const getNumOfBooks = async (req, res) =>{
    try {
        const numOfBooks = await Book.countDocuments()
        res.status(200).json({
            numOfBooks
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const deleteBook = async (req, res) =>{
    try {
        const { bookId } = req.params
        await Book.findByIdAndDelete(bookId)
        res.status(200).json({
            message: 'Book deleted'
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}