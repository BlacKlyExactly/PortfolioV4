require('dotenv').config();
const nodemailer = require("nodemailer");

exports.handler = ( event, context, callback ) => {
    if (event.httpMethod !== "POST") {
        callback(null, { 
            statusCode: 405, 
            body: "Method Not Allowed" 
        });

        return;
    }

    const body = JSON.parse(event.body);
    const { name, msg, email, title } = body;

    if(!name || !msg || !email || !title){
        callback(null, { 
            statusCode: 400, 
            body: "Missing parameters" 
        });

        return;
    }

    const { SENDER_MAIL, SENDER_PASSWORD, GATSBY_MAIL } = process.env;

    if(!SENDER_MAIL || !SENDER_PASSWORD || !GATSBY_MAIL){
        callback(null, { 
            statusCode: 500, 
            body: "Missing env variables" 
        });

        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',   
        host: "smtp.gmail.com",
        auth: {
            type: "login",
            user: SENDER_MAIL,
            pass: SENDER_PASSWORD
        }
    });

    const mail = {
        from: email,
        to: GATSBY_MAIL,
        subject: title,
        text: `${title}\n\n${msg}\n-----------------------------------------\nSent from: ${email}\nBy: ${name}`,
    }

    transporter.sendMail(mail, ( error, info ) => {
        if(error){
            console.log(error);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(error)
            })

            return;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(info)
        })
    })
}