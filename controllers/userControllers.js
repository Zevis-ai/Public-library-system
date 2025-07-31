import { userValidation } from "../validations/userValidation.js"
import User from "../models/userModel.js"
import bcrypt from 'bcrypt'

export const register = async (req, res) =>{
    try {

        const {name, email, password} = req.body
        const {error , value} = userValidation.validate(req.body)

        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save()
        
    
        res.status(201).send({
            msg: "User created successfully",
            user
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export const login = async (req, res) =>{
    try {
        const {email, password} = req.body

        const {error , value} = userValidation.validate(req.body)


    } catch (error) {
       console.log(error);
        res.status(500).send(error.message); 
    }
}