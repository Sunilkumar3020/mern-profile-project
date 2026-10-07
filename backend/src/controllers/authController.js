import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required."
            })
        }

        // check whether user already exists

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        // hashed password

        const hashedPassword = await bcrypt.hash(password, 10);

        // create user

        const user = await User.create({ name, email, password: hashedPassword })

        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: { id: user._id, name: user.name, email: user.email }
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            success: false,
            message: "Registration failed"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation input

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            })
        }

        // find user

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        //Compare password

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({
                success:false,
                message: "Invalid email or password"
            })
        }

        // create JWT
        const token = jwt.sign(
            {
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d"
            }
        )

        res.status(200).json({
            success:true,
            message: "Login successful",
            token,
            user:{
                id: user._id,
                name:user.name,
                email:user.email
            }
        })


    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
}