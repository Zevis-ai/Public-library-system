import express from 'express'
import { login, register } from '../controllers/userControllers.js'

// | POST   | /api/auth/register | ❌    | רישום 
// | POST   | /api/auth/login    | ❌    | התחברות 

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)



export default userRouter