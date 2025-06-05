import express from 'express';
//import jwtAuth from '../../Middlewares/jwt.middleware.js';
export const friendsRouter = express.Router();

import {FriendController} from "./friend.controller.js";

import jwtAuth from "../../Middlewares/jwt.Middleware.js";

const friendController = new FriendController();

friendsRouter.post('/toggle-friendship/:friendId',jwtAuth,(req,res,next)=>{
    friendController.ToggleFriendRequest(req,res,next);
});

friendsRouter.post('/response-to-request/:friendId',jwtAuth,(req,res,next)=>{
    friendController.RespondToRequest(req,res,next);
});

friendsRouter.get('/get-pending-requests',jwtAuth,(req,res,next)=>{
    friendController.getPendingRequest(req,res,next);
});

friendsRouter.get('/get-friends',jwtAuth,(req,res,next)=>{
    friendController.getFriends(req,res,next);
});