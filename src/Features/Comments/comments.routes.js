import express from 'express';
//import jwtAuth from '../../Middlewares/jwt.middleware.js';
export const commentsRouter = express.Router();

import {CommentsController} from "./comments.controller.js";

import jwtAuth from "../../Middlewares/jwt.Middleware.js";

const commentsController = new CommentsController();





commentsRouter.post('/:postId',jwtAuth,(req,res,next)=>{
    commentsController.postComment(req,res,next);
});


commentsRouter.get('/:postId',jwtAuth,(req,res,next)=>{
    commentsController.getComments(req,res,next);
});


commentsRouter.delete('/:commentId',jwtAuth,(req,res,next)=>{
    commentsController.DeleteComments(req,res,next);
});

commentsRouter.put('/:commentId',jwtAuth,(req,res,next)=>{
    commentsController.UpdateComment(req,res,next);
});