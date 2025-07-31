import express from 'express'
import userRouter from './userRoutes.js'

const configRouter = express.Router()

configRouter.use('/user', userRouter)


export default configRouter