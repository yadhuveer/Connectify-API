import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,match:[/.+\@.+\../,"Please enter a valid email"]},
    password:{type:String},
    gender:{type:String, enum:['Male','Female','male','female','boy','Boy','Girl','girl']},
    tokens:[{type:String}]

})