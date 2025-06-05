import { UserModel } from "./user.model.js";

import {UserRepository} from "./user.repository.js";

import { userSchema } from './user.schema.js';

import mongoose from 'mongoose';

import { ObjectId } from 'mongodb';

const UserModelBase = mongoose.model('User',userSchema);


import bcrypt from 'bcrypt';

import jwt  from 'jsonwebtoken';


export class UserController{
    constructor(){
        this.userRepository= new UserRepository();
    }
    async signUp(req,res,next){
       try{
        console.log(req.body);
        const {name,email,password,gender}=req.body;
        const hashedPassword = await bcrypt.hash(password,12);
        const user= new UserModel(name,email,hashedPassword,gender);
        const user1=await this.userRepository.SignUp(user);

        res.status(201).send(user1);
       }catch(err){
        next(err);
       }
    }



    async SignIn(req,res,next){
        console.log(req.body);
        try{
            const result= await this.userRepository.SignIn(req.body.email);
            if(!result){
             return res.status(400).send('Incorrect Credentials');
            }else{
             const passwordRes = await bcrypt.compare(req.body.password,result.password);
             if(passwordRes){
                 console.log("User id is:"+result._id);
                 const token =jwt.sign({userID:result._id,email:result.email},process.env.JWT_SECRET,{expiresIn:'1h',});
                 console.log(token);
                 console.log(result._id);
                 const updateRes=await UserModelBase.updateOne({_id:new ObjectId(result._id)},{$push:{tokens:token}});
                 
             return res.status(200).send(token);
     
             }else{
                 return res.status(400).send('Incorrect Credentials');
     
             }
             
            }
         }catch(err){
             console.log("Its error");
             next(err);
         }
     


    }




    async GetDetailsById(req,res,next){
        try{
            const result = await this.userRepository.GetDetailsById(req.params.userId);
            console.log("Result is "+result);
            
            return res.status(200).send(result);

        }catch(err){
            console.log(err);
            next(err);
        }

    }

    async GetAllUserDetails(req,res,next){
        try{
            const result = await this.userRepository.GetAllUsersDetails();
            console.log(result);
            
            return res.status(200).send(result);

        }catch(err){
            console.log(err);
            next(err);
        }

    }



    async Logout(req,res,next){
        try{
            const res1=await this.userRepository.Logout(req.userId,req.token);
            console.log(res1);
            return res.status(200).send("Logged out sucessfully");
        }
        catch(err){
            /*console.log("Header error is "+err);
            if (!res.headersSent) {
                return next(err);
            }*/
           res.status(400).send("Something went wrong with database");
        }
    }

    async LogoutAllDevices(req,res,next){
        try{
            const result = await this.userRepository.LogoutAllDevices(req.userId);
            return res.status(200).send("Logged out from all devices sucessfully");
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async UpdateDetails(req,res,next){
        try{
            const {name,email,password,gender} = req.body;
            const UpdatedResult = await this.userRepository.UpdateDetails(req.params.userId,name,email,password,gender);
            return res.status(200).send(UpdatedResult);
        }catch(err){
            console.log(err);
            
            
            next(err);

        }
    }

}