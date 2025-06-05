import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ApplicationError } from '../../error-handler/applicationError.js';

import { commentsSchema } from './comments.schema.js';

import {postSchema} from '../Posts/post.schema.js';

const postModel = mongoose.model('Post',postSchema);
const commentsModel = mongoose.model('Comment',commentsSchema);

export class CommentsRepository{


    async addComment(userId,comment,postId){

        try{

        
        const result = new commentsModel({comment:comment,postId:postId,userId:userId});

        const newResult = await result.save();
        
        const postResult = await postModel.updateOne({_id:postId},{$push:{comments:newResult._id}});
        return newResult;
        }catch(err){
            throw new ApplicationError("Something went wrong with database",500);
        }

    }

    async getComments(postId){
        try{
            const result = await commentsModel.find({postId:postId});
            return result;

        
        }catch(err){
            throw new ApplicationError("Something went wrong database",500);
        }
        

    }

    async DeleteComments(commentId){
        try{
            const result = await commentsModel.deleteOne({_id:commentId});
            return result;
        }catch(err){
            throw new ApplicationError("Something went wrong",500);
        }
    }


    async UpdateComment(commentId,comment){
        try{
            
            const result = await commentsModel.updateOne({_id:commentId},{comment:comment});
            return result;
        }catch(err){
            throw new ApplicationError("Something went wrong",500);
        }
    }
}
