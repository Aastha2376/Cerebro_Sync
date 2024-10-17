import nodemailer from 'nodemailer';
import Mailgen from 'mailgen'

import ENV from '../config.js';

let nodeconfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD
    }
}

let transporter = nodemailer.createTransport(nodeconfig);     //create and send a mail

let mailgenerator = new Mailgen({
    theme:'default',
    product : {
        name : "Mailgen",
        link : 'https://mailgen.js'
    }
})

export const registerMail = async(req,res)=>{
    const {username , userEmail , text , subject} = req.body;

    //body of the email
    var email = {
        body : {
            name : username,
            intro : text || 'Welcome to CerebroSync ! We are very excited to have you onboard',
            outro : 'Need help? Just reply to this mail'
        }
    }

    var emailbody = mailgenerator.generate(email);

    let message = {
        from : ENV.EMAIL,
        to : userEmail,
        subject : subject || "Signup Successful",
        html : emailbody
    }

    //send mail
    transporter.sendMail(message)
        .then(()=>{
            return res.status(200).send({msg : "Please check your mail box."})
        }).catch(error=>res.status(500).send({error}))
}