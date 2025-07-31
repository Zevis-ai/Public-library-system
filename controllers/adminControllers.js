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
    