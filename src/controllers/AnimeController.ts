import type { Request , Response} from "express"
import Anime from "../models/Animes"
import { friendlyurl } from "../utils/urls"
import { IAnime } from '../models/Animes';

export class AnimeController {

    static addAnime = async( req: Request , res: Response) => {
        try {
            const { name } = req.body
            req.body.nameUrl = friendlyurl(name)
           const newAnime = new Anime(req.body)
           await newAnime.save()
            res.send('Anime agregado correctamente')
        } catch (error) {
            console.log(error.errorResponse.errmsg);
            const listError = (error.code == 11000) ? 'Este anime ya está registrado con el mismo título' : 'La petición no cumple con la configuración del Model'
            res.status(401).json({error:listError})
        }
    }

    static getAllAnimes = async( req: Request , res: Response) => {
        try {
            const allAnimes = await Anime.find({})
            res.json(allAnimes)
        } catch (error) {
            console.log(error);
        }
    }

    static getAnimeById = async( req: Request , res: Response) => {
        const { id } = req.params
        try {
            const chosenAnime = await Anime.find({animeName:id}) //findById(id)
            if(!chosenAnime){
                res.status(404).json({error:'Anime no encontrado'})
            }
            res.json(chosenAnime)
        } catch (err) {
            console.log(err);
            res.status(500).json({error:'ocurrio un error'})
        }
    }

    static updateAnime = async( req: Request , res: Response) => {
        const { id } = req.params
        try {
            const { animeName } = req.body
            req.body.animeName = friendlyurl(animeName)
            const updateAnime = await Anime.findByIdAndUpdate(id , req.body)

            if(!updateAnime){
                return res.status(404).json({err:'Anime no encontrado y no actualizado'})
            }
            await updateAnime.save()
            res.send('Anime actualizado')
        } catch (err) {
            console.log(err);
            res.status(500).json({error:'ocurrio un error'})
        }
    }

    static deleteAnime = async( req: Request , res: Response) => {
        const { id } = req.params
        try {
           const anime = await Anime.findById(id)

           await anime.deleteOne()
           res.send('Anime eliminado')
        } catch (err) {
            console.log(err);
            res.status(500).json({error:'ocurrio un error'})
        }
    }

}