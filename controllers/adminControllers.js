// getNumOfMembers()//only admin
// getNumOfBooksBorrowed() // only admin
// getSomOfMoney()// only admin
// theMostRequestedBook()// only admin

import User from "../models/userModel.js"

export const getNumOfMembers = async (req, res) => {
    try {
        const numOfMembers = await User.countDocuments()
        res.status(200).json({
            numOfMembers
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}
    

export const getNumOfBooksBorrowed = async (req, res) => {
    try {
        const numOfBooksBorrowed = await Book.countDocuments({ isAvailable: false })
        res.status(200).json({
            numOfBooksBorrowed
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}