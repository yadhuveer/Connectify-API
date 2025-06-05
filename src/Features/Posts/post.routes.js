import express from 'express';
//import jwtAuth from '../../Middlewares/jwt.middleware.js';
export const postRouter = express.Router();

import {PostController} from "./post.controller.js";

import jwtAuth from "../../Middlewares/jwt.Middleware.js";

const postController = new PostController();

postRouter.get('/all',jwtAuth,(req,res,next)=>{
    postController.getAllPost(req,res,next);
});

postRouter.get('/user/:userId',jwtAuth,(req,res,next)=>{
    postController.getUserPost(req,res,next);
});

postRouter.post('/',jwtAuth,(req,res,next)=>{
    postController.createPost(req,res,next);
});

postRouter.get('/:postId',jwtAuth,(req,res,next)=>{
    postController.getPost(req,res,next);
});

postRouter.delete('/:postId',jwtAuth,(req,res,next)=>{
    postController.DeletePost(req,res,next);
});

postRouter.put('/:postId',jwtAuth,(req,res,next)=>{
    postController.updatePost(req,res,next);
});