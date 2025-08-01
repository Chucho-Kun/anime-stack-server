import jwt from "jsonwebtoken"
import { Types } from "mongoose"


type UserPayLoad = {
    id: Types.ObjectId
}

export const generateJWT = (payload: UserPayLoad) => {
    const token = jwt.sign(payload , process.env.JWT , {
        expiresIn: '1d'
    })
    return token
}