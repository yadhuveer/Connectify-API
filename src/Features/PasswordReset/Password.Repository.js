import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ApplicationError } from '../../error-handler/applicationError.js';

import { userSchema } from '../user/user.schema.js';

import nodemailer from 'nodemailer';

import crypto from 'crypto';
import bcrypt from 'bcrypt';


const UserModel = mongoose.model('User',userSchema);





    
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'yadhuveeryadu@gmail.com',
            pass:'jjmf pprh snww ecyp'
        }
    });




export class PasswordRepository{

    async SendOTP(userId,registeredMail){

        const userDetails = await UserModel.findOne({_id:userId,email:registeredMail});
        if(!userDetails){
            return "";
        
        } 
        const otp = await crypto.randomInt(1000, 10000);

        const mailOptions = {
            from: 'yadhuveeryadu@gmail.com',  // writing the mail id just for testing purpose.
            to: 'yadhuveeryadu@gmail.com',   // Else from and to sholud be replaced with user mail and server mail;
            subject: 'Opt to Password Reset Social Media',
            text: otp.toString()
        };
        
        try{
            const result = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
            return otp;
        }catch(err){
            console.log('Email send failer with error: '+ err);
            return "";
        }

    }


    async OtpVerify(senderOtp,originalOtp){
        if(parseInt(senderOtp)==parseInt(originalOtp)){
            return "Otp Verified";
        }else{
            throw new ApplicationError("OTP enterd is wrong",500);
        }

    }

    async resetPassword(userId,newPassword){
        try{
            const result = await UserModel.findOne({ _id: new ObjectId(userId) });
            const hashedPassword = await bcrypt.hash(newPassword,12);
            result.password=hashedPassword;
            const newReult = await result.save();
            return "Password has been reset";
        }catch(err){
            throw new ApplicationError("Something went wrong with database",500);
        }
    }
}