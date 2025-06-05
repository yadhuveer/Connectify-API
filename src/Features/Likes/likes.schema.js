import mongoose from "mongoose";

export const likesSchema = new mongoose.Schema({
    like:Number,
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"Post"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
    

}
)