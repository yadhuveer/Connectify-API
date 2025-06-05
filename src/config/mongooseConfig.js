import mongoose from "mongoose"

import dotenv from "dotenv";


dotenv.config();

const url = process.env.DB_URL;

export const ConnectUsingMongoose = async ()=>{
    try{
        await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("Mongodb using mongosse is connected");
        
    }catch(err){
        console.log(err);
    }
}
