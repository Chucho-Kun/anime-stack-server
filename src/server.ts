import express from "express"
import dotenv from "dotenv"
import animeRoutes from "./routes/animeRoutes"
import userRoutes from "./routes/userRoutes"
import { connectDB } from "./config/db"
import cors from "cors"
import { corsConfig } from "./config/cors"

dotenv.config()
connectDB()

const app = express()
app.use(cors(corsConfig))
app.use(express.json())

// Rutas
app.use('/anime' , animeRoutes )
app.use('/user' , userRoutes )

export default app