import express from "express";

import cors from "cors"
import { configDotenv } from "dotenv";

import connectDB from "./src/config/db.js";

import profileRoutes from "./src/routes/profileRoutes.js"

configDotenv({ path: "./.env" })

const app = express()

connectDB()

app.use(cors({ origin: "http://localhost:5173" }))

app.use(express.json())

app.use("/api/profiles/", profileRoutes)

app.get("/", (req, res) => {
    res.json({ message: "Profile API is running" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})