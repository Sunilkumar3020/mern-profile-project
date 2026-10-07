import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
// validate input
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required."
            })
        }

        // check whether user already exists

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success:false,
                message: "User already exists"
            })
        }

        // hashed password

        const hashedPassword = await bcrypt.hash(password, 10);

        // create user

        const user = await User.create({name, email, password:hashedPassword})

        res.status(201).json({
            success:true,
            message: "Registration successful",
            data: {id: user._id, name: user.name, email: user.email}
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            success:false,
            message: "Registration failed"
        })
    }
}