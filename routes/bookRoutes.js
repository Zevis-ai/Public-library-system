import express from 'express'
import { addBook, deleteBook, getAllBooks, getNumOfBooks , isBookBorrowed} from '../controllers/bookControllers.js'
import { adminMid } from '../middlewares/admin.js'

// getAllBooks()
// getNumOfBooks()// only admin
// addBook()// only admin
// deleteBook()// only admin
// upDateBook()// only admin
// isBookBorrowed()
// getPrice(bookID)

const bookRouter = express.Router()

bookRouter.get('/all', getAllBooks)
bookRouter.get('/numOfBooks', getNumOfBooks)
bookRouter.post('/add',adminMid, addBook)
bookRouter.delete('/delete/:bookId',adminMid, deleteBook)
// bookRouter.put('/update', upDateBook)
bookRouter.get('/isBookBorrowed/:bookId', isBookBorrowed)
// bookRouter.get('/getPrice', getPrice)

export default bookRouter