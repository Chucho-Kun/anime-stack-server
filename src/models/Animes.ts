import mongoose, { Document, Schema , PopulatedDoc, Types } from "mongoose"
import { IUser } from "./Users"

export interface IRanking extends Document {
    user: Types.ObjectId
    ranking: number
}

export interface IAnime extends Document {
    name: string
    nameUrl: string
    review: string
    gender: string
    studio: string
    date: string
    img: string
    followers: PopulatedDoc<IUser & Document>[]
    animeRanking: {
        user: Types.ObjectId,
        ranking: number
    }[]
}

const AnimeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nameUrl: {
        type: String,
        trim: true,
        unique: true
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        required: true,
        trim: true
    },
    studio:{
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    img:{
        type: String,
        trim: true,
        default:"../src/assets/covers/1.png"
    },
    followers:[{
        type: Types.ObjectId,
        ref:'User'
    }],
    animeRanking: [{
        user: {
            type: Types.ObjectId,
            ref:'User'
        },
        ranking: {
            type: Number
        }
    }]
})

const Anime = mongoose.model<IAnime>('Anime' , AnimeSchema)
export default Anime