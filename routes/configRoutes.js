import express from 'express'
import userRouter from './userRoutes.js'
import bookRouter from './bookRoutes.js'

const configRouter = express.Router()

configRouter.use('/user', userRouter)
configRouter.use('/book', bookRouter)


export default configRouter