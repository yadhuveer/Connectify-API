import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    caption:String,
    imageUrl:String,
    ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}]
    

})