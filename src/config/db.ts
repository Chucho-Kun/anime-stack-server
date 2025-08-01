import mongoose from "mongoose";
import colors from 'colors';

export const connectDB = async () => {
    const puerto = process.env.DATABASE_URL     
    try {
        const conexion = await mongoose.connect( process.env.DATABASE_URL )
        const url = `${conexion.connection.host}:${conexion.connection.port}`
        console.log(colors.yellow.bold(`Base de Datos lista: ${url}`));
        
    } catch (error) {
        console.log(colors.bgRed.bold(error.message));
        process.exit(1)
    }    
}
