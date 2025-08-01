import { Router } from "express"
import { AnimeController } from "../controllers/AnimeController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"

const router = Router()

router.get('/' , AnimeController.getAllAnimes )

router.post('/add' , 
    body("name")
        .notEmpty().withMessage('Falta el nombre del anime'),
    body("review")
        .notEmpty().withMessage('Falta el resumen del anime'),
    body("gender")
        .notEmpty().withMessage('Falta el género del anime'),
    body("studio")
        .notEmpty().withMessage('Falta el estudio del anime'),
    body("date")
        .notEmpty().withMessage('Falta la fecha del anime'),
    handleInputErrors,
    AnimeController.addAnime 
)

router.get('/:id' ,
    handleInputErrors,
    AnimeController.getAnimeById )

router.put('/:id' ,
    param('id').isMongoId().withMessage('id no válido'),
    body("name")
        .notEmpty().withMessage('Falta el nombre del anime'),
    body("review")
        .notEmpty().withMessage('Falta el resumen del anime'),
    body("gender")
        .notEmpty().withMessage('Falta el género del anime'),
    body("date")
        .notEmpty().withMessage('Falta la fecha del anime'),
    handleInputErrors,
    AnimeController.updateAnime )

router.delete('/:id' ,
    param('id').isMongoId().withMessage('id no válido'),
    handleInputErrors,
    AnimeController.deleteAnime )

export default router