import UserModel from "../model/user_model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from 'otp-generator';
import express from 'express';

export async function verifyuser(req,res,next){
    try{
        const {username}  = req.method == "GET" ? req.query : req.body;
        //check the user existance
        let exist = await UserModel.findOne({username});
        if(!exist) return res.status(404).send({error : "Cannot find username"});
        next();
    }catch(error){
        return res.status(404).send({error : "Authentication Error"});
    }
}
export async function register(req, res) {  // POST
    try {
        const { username, password, profile, email } = req.body;

        // Check for existing username
        const existUsername = await UserModel.findOne({ username });
        if (existUsername) {
            return res.status(400).send({ error: "Please use a unique username" });
        }

        // Check for existing email
        const existEmail = await UserModel.findOne({ email });
        if (existEmail) {
            return res.status(400).send({ error: "Please use a unique email" });
        }

        // Hash password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",  // default to empty string if profile is not provided
                email
            });

            // Save user and send response
            await user.save();
            return res.status(201).send({ msg: "User registered successfully!" });
        }

        return res.status(400).send({ error: "Password is required" });
    } catch (error) {
        return res.status(500).send({ error: "Something went wrong, please try again later" });
    }
}
 
export async function login(req, res) {  // POST
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).send({ error: "Username not found" });
        }

        // Compare the provided password with the stored hashed password
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).send({ error: "Incorrect password" });
        }

        // JWT - Sign a token for authentication
        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, ENV.JWT_Secret, { expiresIn: "24h" });

        // Return success response with token
        return res.status(200).send({
            msg: "Login Successful!",
            username: user.username,
            token
        });
    } catch (error) {
        return res.status(500).send({ error });
    }
}

export async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid username" });
        }

        const user = await UserModel.findOne({ username }).select('-password');

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function updateUser(req, res) { // PUT
    try {
        //const id = req.query.id;
        const { userId } = req.user;

        if (!userId) {
            return res.status(400).send({ error: "User ID is required" });
        }
        const body = req.body;

        // Update the user data
        const result = await UserModel.updateOne({ _id: userId }, body);

        return res.status(200).send({ msg: "Record Updated" });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send({ error: error.message });
    }
}


export async function generateOTP(req,res){         //GET
    req.app.locals.otp = await otpGenerator.generate(6,{lowerCaseAlphabets: false,upperCaseAlphabets : false , specialChars: false})
    res.status(201).send({code : req.app.locals.otp})
}

export async function verifyOTP(req,res){        //GET
    const {code} = req.query;
    if(parseInt(req.app.locals.otp) == parseInt(code)){
        req.app.locals.otp = null;         //this resets the otp , one otp cannot be verified more than once
        req.app.locals.resetSession = true;    //starts the reset password session 
        return res.status(201).send({msg : 'Verified Successfully'});         
    }
    return res.status(400).send({error : "Invalid OTP"});
}

export async function createResetSession(req,res){      //GET
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false;
        return res.status(201).send({msg : "Access granted"});
    }
    return res.status(404).send({error : "Session Expired"});
}

export async function resetpassword(req, res) {
    try {
        if(!req.app.locals.resetSession){
            return res.status(440).send({error : "Session Expired"})
        }
        const { username, password } = req.body;

        // Check if username or password is missing
        if (!username || !password) {
            return res.status(400).send({ error: "Username and password are required" });
        }

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.updateOne(
                { username },
                { password: hashedPassword }
            );
        }

        return res.status(201).send({ msg: "Password updated successfully" });

    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
}
