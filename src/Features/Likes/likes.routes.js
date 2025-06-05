import express from 'express';
//import jwtAuth from '../../Middlewares/jwt.middleware.js';
export const likesRouter = express.Router();

import {LikesController} from "./likes.controller.js";

import jwtAuth from "../../Middlewares/jwt.Middleware.js";

const likesController = new LikesController();





likesRouter.post('/toggle/:postId',jwtAuth,(req,res,next)=>{
    likesController.ToggleLike(req,res,next);
});

likesRouter.get('/:postId',jwtAuth,(req,res,next)=>{
    likesController.getLike(req,res,next);
});
