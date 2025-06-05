import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ApplicationError } from '../../error-handler/applicationError.js';

import { postSchema } from './post.schema.js';

const postModel = mongoose.model('Post',postSchema);

export class PostRepository{


    async CreatePost(userId,caption,imageUrl){

        try{

        
        const post = new postModel({caption:caption,imageUrl:imageUrl,ownerId: new ObjectId(userId)});
        const result = await post.save();
        return result;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);
        }
    }

    async GetAllPosts(){
        try{
            const result = await postModel.find();
            return result;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);
        }
    }




    async GetPost(id){
        try{
            const result = await postModel.findOne({_id:new ObjectId(id)});
            return result;
        }catch(err){


            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);
        
        }
    
    }

    async GetUserPost(id){
        try{
            console.log("Id is "+id);
            const result = await postModel.find({ownerId:new ObjectId(id)});
            return result;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);
        }

    }


    async DeletePost(postId){
        try{
            const result = await postModel.deleteOne({_id:postId});
            return result;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);
        }
    }

    async UpdatePost(postId,imageUrl,caption){
        try{
            const result = await postModel.findOne({_id:postId});

            if(imageUrl){
                result.imageUrl=imageUrl;
            }

            if(caption){
                result.caption=caption;
            }

            const newResult= await result.save();
            return newResult;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database",500);

        }
    }


}
