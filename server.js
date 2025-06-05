import './env.js';
import express from 'express';
import bodyParser from 'body-parser';



import {ConnectUsingMongoose} from './src/config/mongooseConfig.js';

import mongoose from 'mongoose';
import { userRouter} from './src/Features/user/user.routes.js';
import {postRouter} from './src/Features/Posts/post.routes.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {commentsRouter} from './src/Features/Comments/comments.routes.js';
import {likesRouter} from './src/Features/Likes/likes.routes.js';
import {passwordRouter} from './src/Features/PasswordReset/Password.routes.js';
import {friendsRouter} from './src/Features/Friends/friend.routes.js';
import  session from 'express-session';

const server = express();

server.use(bodyParser.json());


server.use(
    session({
        secret:'SecretKey',
        resave:false,
        saveUninitialized:true,
        cookie:{secure:false},
    })
);


server.use('/api/users',userRouter);
server.use('/api/posts',postRouter);
server.use('/api/comments',commentsRouter);
server.use('/api/likes',likesRouter);
server.use('/api/otp',passwordRouter);
server.use('/api/friends',friendsRouter);




server.use((err,req,res,next)=>{
    console.error('Error type:', err.name); // Log the error type
    console.error('Error message:', err.message);


    if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message);
    }

    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }
    //Server error
   // console.log(err);
    return res.status(500).send('Something went wrong, please try later');
});



server.use((req,res)=>{
    res.status(404).send("API not found");
})


server.listen(3000,()=>{
    console.log("Server is running at 3000");
    ConnectUsingMongoose();
    //connectToMongoDB();

});
