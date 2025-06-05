import {FriendRepository} from './friend.repository.js';

export class FriendController{

    constructor(){
        this.friendRepository = new FriendRepository();   
    }

    async ToggleFriendRequest(req,res,next){
        try{

            const result = await this.friendRepository.ToggleFriendship(req.userId,req.params.friendId);
            res.status(200).send(result);

        }catch(err){
            console.log(err);
            next(err);
        }


    }

    async RespondToRequest(req,res,next){
        try{

            const result = await this.friendRepository.RespondToRequest(req.userId,req.params.friendId);
            res.status(200).send(result);

        }catch(err){
            console.log(err);
            next(err);
        }


    }

    
    async getPendingRequest(req,res,next){
        try{

            const result = await this.friendRepository.getPendingRequest(req.userId);
            res.status(200).send(result);

        }catch(err){
            console.log(err);
            next(err);
        }


    }


    async getFriends(req,res,next){
        try{
            const result = await this.friendRepository.getFriends(req.userId);
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

}
