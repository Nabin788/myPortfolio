require("dotenv").config();
const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const maileSend = (req, res) => {
    const { name, email, subject, message } = req.body;
    const mail = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        }
    });

    const mailContent = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: <h1>${name}</h1>,
        text: <p>${message}</p>
    }

    mail.sendMail(mailContent, (err, sucess) => {
        if (err) {
            console.error(err);

        }
        console.log(sucess);
        return res.redirect("/contact");

    });
}

module.exports = maileSend;



