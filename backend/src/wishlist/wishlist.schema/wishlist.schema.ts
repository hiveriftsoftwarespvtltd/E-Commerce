import { Schema,Types } from "mongoose";


export const WishListSchema = new Schema({
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:Types.ObjectId,
        ref:"ProductDetail",
        required:true
    }
},{timestamps:true})

WishListSchema.index({user:1,product:1},{unique:true})