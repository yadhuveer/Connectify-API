import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ApplicationError } from '../../error-handler/applicationError.js';

import { likesSchema } from './likes.schema.js';

import {postSchema} from '../Posts/post.schema.js';

const postModel = mongoose.model('Post',postSchema);
const likesModel = mongoose.model('Like',likesSchema);


export class LikeRepository{

   async ToggleLike(likeNumber,postId,userId){



    try{
     const likeExsist = await likesModel.findOne({like:likeNumber,postId:postId,userId:userId});

     if(likeExsist){
        const result = await likesModel.deleteOne({like:likeNumber,postId:new ObjectId(postId),userId:new ObjectId(userId)});

        const likesCount = await likesModel.countDocuments({like:likeNumber,postId:new ObjectId(postId),userId:new ObjectId(userId)});
        return `likes has been disliked, Likes count is ${likesCount}`;  
     }else{
        const result = new likesModel({like:likeNumber,postId:new ObjectId(postId),userId:new ObjectId(userId)});
        const newResult = await result.save();
        const likesCount = await likesModel.countDocuments({like:likeNumber,postId:new ObjectId(postId),userId:new ObjectId(userId)});
        return `likes has been added, Likes count is ${likesCount}`;  
    }
}catch(err){
    console.log(err);
    throw new ApplicationError("Something went wrong with database",500);
}
   
}

    async getLikes(postId){



        try{
            const likesNumber = await likesModel.countDocuments({postId:new ObjectId(postId)});
            return `number of likes is ${likesNumber}`;
        }catch(err){
            throw new ApplicationError("Something went wrong with database",500);
        }
        
    }


}