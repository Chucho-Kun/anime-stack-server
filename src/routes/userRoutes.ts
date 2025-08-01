import { Router } from "express"
import { AnimeController } from "../controllers/AnimeController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
import { UserController } from "../controllers/UserController"

const router = Router()

router.post('/add' ,
    body("userName")
        .notEmpty().withMessage('Falta el nombre del usuario'),
    body("userEmail")
        .isEmail().withMessage('Email no válido'),
    body("userPassword")
        .isLength({min:4}).withMessage('El password debe ser mínimo de 4 caracteres'),
    handleInputErrors,
    UserController.addUser )

router.post('/login' ,
    body("userEmail")
        .isEmail().withMessage('Email no válido'),
    body("userPassword")
        .notEmpty().withMessage('Falta agregar el password'),
    handleInputErrors,
    UserController.loginUser )

router.put('/ranking/:id' , UserController.updateRanking )


export default router