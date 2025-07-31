
// getNumOfMembers()//only admin
// getNumOfBooksBorrowed() // only admin
// getSomOfMoney()// only admin
// theMostRequestedBook()// only admin

import express from 'express'
import { getNumOfMembers } from '../controllers/adminControllers.js'


const adminRouter = express.Router()

adminRouter.get('/getNumOfMembers', getNumOfMembers)
// adminRouter.get('/getNumOfBooksBorrowed', getNumOfBooksBorrowed)
// adminRouter.get('/getSomOfMoney', getSomOfMoney)
// adminRouter.get('/theMostRequestedBook', theMostRequestedBook)

export default adminRouter

