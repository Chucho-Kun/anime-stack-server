import colors from "colors";
import server from "./server";
import { connectDB } from "./config/db";

const port = process.env.PORT || 4000

connectDB()

server.listen( port , () => {
    console.log( colors.bgGreen.bold( `Escuchando en el puerto: ${port}`));
})
