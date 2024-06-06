import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import "dotenv/config"
import { UserRouter } from "./user/user.router.js"

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/api/v1/users", UserRouter)
app.use("/api/v1/products", () => {})
app.use("/api/v1/orders", () => {})

await mongoose.connect(process.env.MONGODB_URI, { dbName: "TemplateMERN" })
const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server listens on port: ${PORT}`))
