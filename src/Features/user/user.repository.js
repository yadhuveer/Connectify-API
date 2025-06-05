import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ApplicationError } from '../../error-handler/applicationError.js';

import { userSchema } from './user.schema.js';


const UserModel = mongoose.model('User',userSchema);

export class UserRepository{


    async SignUp(user){
        const newUser = new UserModel(user);
        return await newUser.save();

    }catch(err){
        console.log(err);
        if(err instanceof mongoose.Error.ValidationError){
            throw err;
        }else{
            throw new ApplicationError("Something went wrong with database",500);
        }

    }

    async SignIn(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);
        }
    }


    async GetDetailsById(id){
        try{
            console.log(id);
            return await UserModel.findOne({_id:new ObjectId(id)});
        }catch(err){
            throw new ApplicationError("Something went wrong with database",500);

        }
    }

    async GetAllUsersDetails(){
        try{
            return await UserModel.find();
        }catch(err){
            throw new ApplicationError("Something went wrong with database",500);
        }
    }



    async Logout(userID,token){
        try{
        console.log("UserId is: "+userID);
        console.log("Token is: "+token);
        const result = await UserModel.updateOne(
            { _id: userID }, 
            { $pull: { tokens: token } } 
          );
        console.log(result);
        return result; 
        }catch(err){
            console.log(err);
            console.log("It is an error");
            throw new ApplicationError("Something went wrong with database",500);
        }
    }

    async LogoutAllDevices(userID){
        try{

        
        const result = await UserModel.findOne(
            { _id: userID }
             
          );
           result.tokens=[];
          await result.save();
        }catch(err){
            throw new ApplicationError("Something went wrong with database",500);
        }
    }


    async UpdateDetails(userId,name,email,password,gender){

        try{

        
        const result = await UserModel.findOne(
            { _id: new ObjectId(userId) }
             
          );

          if(name){
            result.name=name;
          }

          if(email){
            result.email=email;
          }


          if(password){
            const hashedPassword = await bcrypt.hash(password,12);
            result.password=hashedPassword;
          }

          if(gender){
            result.gender=gender;
          }

          const newResult = await result.save();
          return newResult;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);
        }
    }

}