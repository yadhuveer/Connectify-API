import jwt  from 'jsonwebtoken';

import { userSchema } from '../Features/user/user.schema.js';

import mongoose from 'mongoose';

import { ObjectId } from 'mongodb';

const UserModel = mongoose.model('User',userSchema);

const jwtAuth =async (req,res,next)=>{



    const token = await req.headers['authorization'];
    //console.log(req.headers);
    //console.log(token);

    if(!token){
        return res.status(401).send('Unauthorized');
    }

    

    try{
        const payload = await jwt.verify(token,process.env.JWT_SECRET);
        console.log("Payload userID Is "+payload.userID);
        console.log(" Assinging token is "+token);
        req.userId=payload.userID; 
        req.token = token;
        //console.log(payload);
    }catch(err){
        console.log(err);
        return res.status(401).send('Unauthorized');
    }

    const user = await UserModel.findOne({_id:new ObjectId(req.userId)});
    //console.log("JWT user is "+user);
    if(!user.tokens.includes(token)){
        console.log("Sending response");
        return res.status(401).send('Unauthorized');
    }
    console.log("No error");
    next();

}

export default jwtAuth;