import express from 'express';
//import jwtAuth from '../../Middlewares/jwt.middleware.js';
export const passwordRouter = express.Router();

import {PasswordController} from "./Password.controller.js";

import jwtAuth from "../../Middlewares/jwt.Middleware.js";

const passwordController = new PasswordController();

passwordRouter.post('/send',jwtAuth,(req,res,next)=>{
    passwordController.SendOTP(req,res,next);
});

passwordRouter.post('/verify',jwtAuth,(req,res,next)=>{
    passwordController.VerifyOTP(req,res,next);
});

passwordRouter.post('/reset-password',jwtAuth,(req,res,next)=>{
    passwordController.ResetPassword(req,res,next);
});