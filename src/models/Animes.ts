import mongoose, { Document, Schema , PopulatedDoc, Types } from "mongoose"
import { IUser } from "./Users"

export interface IRanking extends Document {
    user: Types.ObjectId
    ranking: number
}

export interface IAnime extends Document {
    animeName: string
    animeReview: string
    animeGender: string
    animeStudio: string
    animeDate: string
    animeImg: string
    followers: PopulatedDoc<IUser & Document>[]
    animeRanking: {
        user: Types.ObjectId,
        ranking: number
    }[]
}

const AnimeSchema: Schema = new Schema({
    animeName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    animeReview: {
        type: String,
        required: true,
        trim: true
    },
    animeGender:{
        type: String,
        required: true,
        trim: true
    },
    animeStudio:{
        type: String,
        required: true,
        trim: true
    },
    animeDate: {
        type: String,
        required: true,
        trim: true
    },
    animeImg:{
        type: String,
        required: true,
        trim: true
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