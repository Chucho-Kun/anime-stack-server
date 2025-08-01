import { Router } from "express"
import { AnimeController } from "../controllers/AnimeController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"

const router = Router()

router.get('/' , AnimeController.getAllAnimes )

router.post('/add' , 
    body("animeName")
        .notEmpty().withMessage('Falta el nombre del anime'),
    body("animeReview")
        .notEmpty().withMessage('Falta el resumen del anime'),
    body("animeGender")
        .notEmpty().withMessage('Falta el género del anime'),
    body("animeStudio")
        .notEmpty().withMessage('Falta el estudio del anime'),
    body("animeDate")
        .notEmpty().withMessage('Falta la fecha del anime'),
    body("animeImg")
        .notEmpty().withMessage('Falta la portada del anime'),
    handleInputErrors,
    AnimeController.addAnime 
)

router.get('/:id' ,
    handleInputErrors,
    AnimeController.getAnimeById )

router.put('/:id' ,
    param('id').isMongoId().withMessage('id no válido'),
    body("animeName")
        .notEmpty().withMessage('Falta el nombre del anime'),
    body("animeReview")
        .notEmpty().withMessage('Falta el resumen del anime'),
    body("animeGender")
        .notEmpty().withMessage('Falta el género del anime'),
    body("animeDate")
        .notEmpty().withMessage('Falta la fecha del anime'),
    body("animeImg")
        .notEmpty().withMessage('Falta la portada del anime'),
    handleInputErrors,
    AnimeController.updateAnime )

router.delete('/:id' ,
    param('id').isMongoId().withMessage('id no válido'),
    handleInputErrors,
    AnimeController.deleteAnime )

export default router