import type { Request , Response} from "express"
import Anime from "../models/Animes"
import { friendlyurl } from "../utils/urls"

export class AnimeController {

    static addAnime = async( req: Request , res: Response) => {
        try {
            const { animeName } = req.body
            req.body.animeName = friendlyurl(animeName)
           const newAnime = new Anime(req.body)
           await newAnime.save()
            res.send('Anime agregado correctamente')
        } catch (err) {
            console.log(err.errorResponse.errmsg);
            const listError = (err.code == 11000) ? 'El título del anime ya existe' : 'La petición no cumple con la configuración del Model'
            res.status(401).json({err:listError})
        }
    }

    static getAllAnimes = async( req: Request , res: Response) => {
        try {
            const allAnimes = await Anime.find({})
            res.json(allAnimes)
        } catch (err) {
            console.log(err);
        }
    }

    static getAnimeById = async( req: Request , res: Response) => {
        const { id } = req.params
        try {
            const chosenAnime = await Anime.find({animeName:id}) //findById(id)
            if(!chosenAnime){
                res.status(404).json({err:'Anime no encontrado'})
            }
            res.json(chosenAnime)
        } catch (err) {
            console.log(err);
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
        }
    }

}