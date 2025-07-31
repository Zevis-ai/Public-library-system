import express from 'express'
import { borrowBook, login, register, returnBook } from '../controllers/userControllers.js'


const userRouter = express.Router()


// login()
// register()
// forgotPassword()
// getMyBooks()
// borrowBook()
// returnBook()
// myFavoriteBooks()
// myProfile() //get & update

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/borrowBook/:bookId', borrowBook)
userRouter.post('/returnBook/:bookId', returnBook)






export default userRouter