import express from 'express';
//import jwtAuth from '../../Middlewares/jwt.middleware.js';
export const userRouter = express.Router();

import {UserController} from "./user.controller.js";

import jwtAuth from "../../Middlewares/jwt.Middleware.js";

const userController = new UserController();

userRouter.post('/signup',(req,res,next)=>{
    userController.signUp(req,res,next);
});


userRouter.post('/signin',(req,res,next)=>{
    userController.SignIn(req,res,next);
});

userRouter.get('/get-details/:userId',jwtAuth,(req,res,next)=>{
    userController.GetDetailsById(req,res,next);
});

userRouter.get('/get-all-details',jwtAuth,(req,res,next)=>{
    userController.GetAllUserDetails(req,res,next);
});

userRouter.post('/logout',jwtAuth,(req,res,next)=>{
    userController.Logout(req,res,next);
});


userRouter.post('/logout-all-devices',jwtAuth,(req,res,next)=>{
    userController.LogoutAllDevices(req,res,next);
});

userRouter.put('/update-details/:userId',jwtAuth,(req,res,next)=>{
    userController.UpdateDetails(req,res,next);
});