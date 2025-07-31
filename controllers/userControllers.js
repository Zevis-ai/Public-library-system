import { userValidation } from "../validations/userValidation.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Book from "../models/bookModel.js";

// login()
// register()
// forgotPassword()
// getMyBooks()
// borrowBook()
// returnBook()
// myFavoriteBooks()
// myProfile() //get & update

export const register = (req, res) => {
    const {name, email, password } = req.body;

    const {error, value} = userValidation.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    
    User.find({ email }).then(users => {
        if (users.length >= 1) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    err
                });
            }
            const user = new User({
                name,
                email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User created',
                        user: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        err
                    });
                });
        });
    });
};

export const login = (req, res) => {
    const {name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Invalid email or password'
        });
    }

    User.find({ email }).then(users => {
        if (users.length < 1) {
            return res.status(401).json({
                message: 'Auth failed e'
            });
        }

        const [user] = users;

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed p'
                });
            }
            if (result) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        role: user.role
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token
                });
            }
            res.status(401).json({
                message: 'Auth failed 2',

            });
        });
    });
};

export const borrowBook = async(req, res) => {
    try {
        const { bookId } = req.params;
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.id;

        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({
                message: 'User or book not found'
            });
        }

        if (user.isHaveABook) {
            return res.status(400).json({
                message: 'User have a book'
            });
        }

        if (!book.isAvailable) {
            return res.status(400).json({
                message: 'Book is noavailable'
            });
        }

        user.isHaveABook = true;
        user.book = book._id;
        book.isAvailable = false;

        await user.save();
        await book.save();

        res.status(200).json({
            message: 'Book borrowed',
            user,
            book
        });
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

// res
// {
//     "message": "Book borrowed",
//     "user": {
//         "_id": "688b5d8b84534120e644956a",
//         "name": "zevi",
//         "email": "zevi5@gmail.com",
//         "password": "$2b$10$FKgw9Xdk4pyZ59civOrcVO7.r1zqoPD3mV1S2vbUBrB5gfIGFzx4e",
//         "isHaveABook": true,
//         "amountOfMoney": 0,
//         "role": "admin",
//         "__v": 0,
//         "book": "688b6fac04f065ac13759646"
//     },
//     "book": {
//         "_id": "688b6fac04f065ac13759646",
//         "name": "zevisbook",
//         "numOfPage": 120,
//         "author": "zevi friedman 1",
//         "genre": "מתח",
//         "publishedYear": 1999,
//         "isAvailable": false,
//         "price": 10000,
//         "__v": 0
//     }
// }

export const returnBook = async (req, res) =>{
    try {
        const { bookId } = req.params;
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.id;

        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({
                message: 'user or book not found'
            });
        }

        if (!user.isHaveABook) {
            return res.status(400).json({
                message: 'user dont have a book'
            });
        }

        if (book.isAvailable) {
            return res.status(400).json({
                message: 'book is available'
            });
        }

        user.isHaveABook = false;
        user.book = null;
        book.isAvailable = true;

        await user.save();
        await book.save();

        res.status(200).json({
            message: 'Book returned !!!!!!!!!!!!!!!1',
            user,
            book
        });
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

// res
// {
//     "message": "Book returned !!!!!!!!!!!!!!!1",
//     "user": {
//         "_id": "688b5d8b84534120e644956a",
//         "name": "zevi",
//         "email": "zevi5@gmail.com",
//         "password": "$2b$10$FKgw9Xdk4pyZ59civOrcVO7.r1zqoPD3mV1S2vbUBrB5gfIGFzx4e",
//         "isHaveABook": false,
//         "amountOfMoney": 0,
//         "role": "admin",
//         "__v": 0,
//         "book": null
//     },
//     "book": {
//         "_id": "688b6fac04f065ac13759646",
//         "name": "zevisbook",
//         "numOfPage": 120,
//         "author": "zevi friedman 1",
//         "genre": "מתח",
//         "publishedYear": 1999,
//         "isAvailable": true,
//         "price": 10000,
//         "__v": 0
//     }
// }