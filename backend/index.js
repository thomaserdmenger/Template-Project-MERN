import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import morgan from "morgan"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

await mongoose.connect(process.env.MONGODB_URI, { dbName: "TemplateMERN" })
const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server listens on port: ${PORT}`))
