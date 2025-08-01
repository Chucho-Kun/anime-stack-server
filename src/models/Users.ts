import mongoose, { Document , Schema , PopulatedDoc, Types } from "mongoose";
import { IAnime } from "./Animes";

export interface IUser extends Document {
    _id: Types.ObjectId
    userName: string
    userEmail: string
    userPassword: string
    userAvatar: string
    follow: PopulatedDoc<IAnime>
}

const UserSchema : Schema = new Schema ({
    userName: {
        type: String,
        trim: true,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    userPassword:{
        type: String,
        required: true,
        trim: true
    },
    userAvatar: {
        type: String,
        default: '/avatarDefault.png'
    },
    follow: {
        type: Types.ObjectId,
        ref: 'Anime'
    }
})

const User = mongoose.model<IUser>('User' , UserSchema)
export default User
