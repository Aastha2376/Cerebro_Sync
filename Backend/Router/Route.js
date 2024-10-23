import { Router } from "express";
const router = Router();    
import Auth , {localVariables} from "../middleware/auth.js";
import * as controller from '../controllers/appController.js';
import { registerMail } from "../controllers/mailer.js";
// POST
router.route('/register').post(controller.register);        //register user

router.route('/registerMail').post(registerMail)     //send email

router.route('/authenticate').post(controller.verifyuser , (req,res)=>res.end());     //authenticate user

router.route('/login').post(controller.verifyuser , controller.login)             //first verifies the user ad then redirects login in app


// GET
router.route('/user/:username').get(controller.getUser)        //user with username
router.route('/generateOTP').get(controller.verifyuser, localVariables , controller.generateOTP)          // generate random OTP
router.route('/verifyOTP').get(controller.verifyuser , controller.verifyOTP)            //verify generated OTP
router.route('/createResetSession').get(controller.createResetSession)         //reset all variables

// PUT

router.route('/updateuser').put(Auth , controller.updateUser)          // is use to update the user profile
router.route('/resetpassword').put(controller.verifyuser , controller.resetpassword)          //use to reset password

export default router;              