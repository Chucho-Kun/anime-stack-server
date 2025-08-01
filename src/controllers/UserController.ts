import type { Request , Response} from "express"
import Anime from "../models/Animes"
import { IRanking } from '../models/Animes';
import { Types } from "mongoose";
import User from "../models/Users";
import { IUser } from '../models/Users';
import { generateJWT } from "../utils/jwt";


export class UserController {

    static addUser = async ( req: Request<{},{},IUser> , res: Response) => {
        const { userEmail } = req.body
        try {
            const userExist = await User.findOne({userEmail})
            if(userExist){
                res.status(409).json({err:'La cuenta ya existe'})
            }
            const user = new User(req.body)
            user.save()
            res.send('Cuenta creada correctamente!')
            
        } catch (err) {
            res.status(500).json({err:'Hubo un error al tratar de crear la cuenta'})
        }
    }

    static loginUser = async ( req: Request<{},{},IUser> , res: Response) => {
        const { userEmail , userPassword } = req.body
        try {
            const userExist = await User.findOne({userEmail})
            if(!userExist){
                res.status(409).json({err:'La cuenta no existe, favor de crear una'})
            }

            const isPassword = (userPassword === userExist.userPassword) ? true : false

            if(!isPassword){
                res.status(401).json({err:'Password incorrecto'})
            }

            const token = generateJWT({id: userExist._id})
            res.send(token)
        } catch (err) {
            res.status(500).json({err:'Hubo un error al iniciar sesión'})
        }
    }


    static updateRanking = async( req: Request<{id:Types.ObjectId},{},IRanking>, res: Response) => {
        const { id} = req.params
        const { user, ranking } = req.body

        try {
            
            const anime = await Anime.findById(id)
            if(!anime){
                return res.status(404).json({err: 'El anime ya no existe en el sitio web'})
            }

            const rankingExist = anime.animeRanking.find( u => u.user === user)

            if(rankingExist){
                rankingExist.ranking = ranking
            }else{
                anime.animeRanking.push({ user , ranking })
            }

            await anime.save();
            res.send('Gracias por tu voto!')
        
        } catch (err) {
            res.status(401).json({err:'Hubo un problema al votar por este anime'})
        }
    }

}