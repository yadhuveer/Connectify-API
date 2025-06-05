import {LikeRepository} from './likes.repository.js';

export class LikesController{

constructor(){
    this.likesRepository = new LikeRepository();   
}

async ToggleLike(req,res,next){


    
    try{
    const result = await this.likesRepository.ToggleLike(1,req.params.postId,req.userId);
    res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    
    }
    
}


async getLike(req,res,next){
    try{
        const result = await this.likesRepository.getLikes(req.params.postId);
        res.status(200).send(result);
        }catch(err){
            console.log(err);
            next(err);
        
        }
}


}