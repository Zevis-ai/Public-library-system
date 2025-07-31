import { userValidation } from "../validations/userValidation.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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