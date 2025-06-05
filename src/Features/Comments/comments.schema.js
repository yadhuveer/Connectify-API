import mongoose from "mongoose";

export const commentsSchema = new mongoose.Schema({
    comment:String,
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"Post"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
    

}
)