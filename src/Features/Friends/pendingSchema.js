import mongoose from "mongoose";

export const PendingSchema = new mongoose.Schema({
    RequestSenderId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    RequestSeekingId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
    

}
)