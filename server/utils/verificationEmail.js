const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.emailHOST,
            service: process.env.emailSERVICE,
            port: Number(process.env.emailPORT),
            secure: Boolean(process.env.emailSecure),
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailPassword,
            },
         });

         await transporter.sendMail({
            from: process.env.emailUser,
            to: email,
            subject: subject,
            text: text
         });
         console.log("Email sent successfully");
        }
        catch(error) {
            console.log("Email not sent")
            console.log(error);
            return error;

        }
}