require("dotenv").config();
const nodemailer = require("nodemailer");

const maileSend = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const mail = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            }
        });
        const mailContent = {
            from: `${email} ${name}`,
            to: process.env.EMAIL,
            subject: "Inquiry",
            html: `<h1>Message from ${name}:</h1><strong>${message}</strong>`,
            replyTo: email
        }

        mail.sendMail(mailContent).then((sucess) => {
            console.log(sucess);
            return res.status(308).redirect("/contact");
        }).catch((err) => {
            console.error(err);
            return res.status(404).send({ message: `failed to send email` });
        });
    } catch (err) {
        res.status(203).send("failed to send reset link, Plese enter valid email address");
        console.error(err);
    }
}

module.exports = maileSend;



