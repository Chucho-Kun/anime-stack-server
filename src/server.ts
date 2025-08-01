import express from "express"
import dotenv from "dotenv"
import animeRoutes from "./routes/animeRoutes"
import userRoutes from "./routes/userRoutes"

dotenv.config()

const app = express()
app.use(express.json())

// Rutas
app.use('/anime' , animeRoutes )
app.use('/user' , userRoutes )

export default app