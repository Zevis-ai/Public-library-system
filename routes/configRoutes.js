import express from 'express'
import userRouter from './userRoutes.js'
import bookRouter from './bookRoutes.js'
import adminRouter from './adminRoutes.js'
import { adminMid } from '../middlewares/admin.js'

const configRouter = express.Router()

configRouter.use('/user', userRouter)
configRouter.use('/book', bookRouter)
configRouter.use('/admin',adminMid, adminRouter)


export default configRouter