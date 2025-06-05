import {CommentsRepository} from './comments.repository.js';

export class CommentsController{

constructor(){
    this.commentsRepository = new CommentsRepository();   
}

async postComment(req,res,next){


    
    try{
    const result = await this.commentsRepository.addComment(req.userId,req.body.comment,req.params.postId);
    res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    
    }
    
}

async getComments(req,res,next){
    try{
        const result = await this.commentsRepository.getComments(req.params.postId);
        res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
}


async DeleteComments(req,res,next){
    try{
        const result = await this.commentsRepository.DeleteComments(req.params.commentId);
        res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
}


async UpdateComment(req,res,next){
    try{
        const result = await this.commentsRepository.UpdateComment(req.params.commentId,req.body.comment);
        res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
}

}