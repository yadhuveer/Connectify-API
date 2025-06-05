import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ApplicationError } from '../../error-handler/applicationError.js';

import { PendingSchema } from './pendingSchema.js';

import { friendSchema } from './friend.schema.js';



const pendingModel = mongoose.model('PendingRequest',PendingSchema);
const friendModel = mongoose.model('Friend',friendSchema);


export class FriendRepository{

    async ToggleFriendship(RequestSenderId,RequestSeekingId){

        const checkPending = await pendingModel.findOne({RequestSenderId:new ObjectId(RequestSenderId),RequestSeekingId:new ObjectId(RequestSeekingId)});

        if(checkPending){
            const result = await pendingModel.deleteOne({RequestSenderId:new ObjectId(RequestSenderId),RequestSeekingId:new ObjectId(RequestSeekingId)});
            return "friend has been removed";

        }

        const checkFriend = await friendModel.findOne({userId:new ObjectId(RequestSenderId),friendId:new ObjectId(RequestSeekingId)});

        if(checkFriend){
            const result1 = await friendModel.deleteOne({userId:new ObjectId(RequestSenderId),friendId:new ObjectId(RequestSeekingId)});
            const result2 = await friendModel.deleteOne({userId:new ObjectId(RequestSeekingId),friendId:new ObjectId(RequestSenderId)});
            return "friend has been removed";
        }

        const result3 = new pendingModel({RequestSenderId:new ObjectId(RequestSenderId),RequestSeekingId:new ObjectId(RequestSeekingId)});
        const result5 = await result3.save();
        return "Friend request has been sent";
    
    }
    
    
    
    async RespondToRequest(currentUserId,friendId){

        const checkRequest = await pendingModel.findOne({RequestSenderId:new ObjectId(friendId),RequestSeekingId:new ObjectId(currentUserId)});
        if(checkRequest){
            const deleteFromPending =await pendingModel.deleteOne({RequestSenderId:new ObjectId(friendId),RequestSeekingId:new ObjectId(currentUserId)});
                                                                                                                                                              
            const addFriend1 = new friendModel({userId:new ObjectId(currentUserId),friendId:new ObjectId(friendId)});
            const addFriend1Res = await addFriend1.save();
            const addFriend2 = new friendModel({userId:new ObjectId(friendId),friendId:new ObjectId(currentUserId)});
            const addFriend2Res = await addFriend2.save();
            return "Request Accepted";
        }

        return "Current user logged in doesn't have any friend request from selected Id";


    } 

    async getPendingRequest(currentUserId){
        const awaitingRequests = await pendingModel.find({RequestSeekingId:new ObjectId(currentUserId)});
        return awaitingRequests;

    }

    async getFriends(userId){

        const friends = await friendModel.find({userId:new ObjectId(userId)});
        return friends;


    }


}