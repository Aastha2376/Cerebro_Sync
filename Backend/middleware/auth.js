import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import { createResetSession } from '../controllers/appController.js';
//Authentication middleware
export default async function Auth(req,res,next){
    try{
       const token = req.headers.authorization.split(" ")[1];

       //retrive the user details of logged in token
       const decoded_token = await jwt.verify(token,ENV.JWT_Secret);
       req.user = decoded_token;
       res.json(decoded_token);
    }catch(error){
        res.status(401).json({error : "Authentication Failed "});
    }
}

export function localVariables(req,res,next){
    req.app.locals = {
        otp : null,
        resetSession : false
    }
    next()
}