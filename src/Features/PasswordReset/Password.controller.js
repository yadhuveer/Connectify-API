import {PasswordRepository} from "./Password.Repository.js";

export class PasswordController{
    constructor(){
        this.passwordRepository = new PasswordRepository();
    }



   async SendOTP(req,res,next){

    try{
        const result = await this.passwordRepository.SendOTP(req.userId,req.body.email);
        if(result){
            console.log(result);
            req.session.otp=result;
            return res.status(200).send("OTP has been sent to registered email");
        }
        
        return res.status(400).send("Unable to find user mail");
        
    }catch(err){
        console.log(err);
        next(err);
    }
   }



   async VerifyOTP(req,res,next){

    try{
        const result = await this.passwordRepository.OtpVerify(req.body.otp,req.session.otp);
        req.session.otp="verified";
        return res.status(200).send(result);
    }catch(err){
        console.log(err);
        next(err);
    }
   }




   async ResetPassword(req,res,next){
    try{
        console.log(req.session.otp);
        if(req.session.otp=="verified"){
        const result = await this.passwordRepository.resetPassword(req.userId,req.body.password);
        req.session.otp="";
        return res.status(201).send(result);
        }else{
            req.session.otp=""
            return res.status(400).send("please verify opt");
        }
    }catch(err){
        req.session.otp=""
        console.log(err);
        next(err);
    }
   }


}
