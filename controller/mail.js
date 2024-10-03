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
            from: `${name} <${email}>`,
            to: process.env.EMAIL,
            subject: "Inquiry",
            html: `<h1>Message from ${name}:</h1><strong>${message}</strong>`,
            replyTo: email
        };

        await mail.sendMail(mailContent);
        console.log("Email sent successfully");
        return res.redirect("/contact"); // Redirect with a status
    } catch (error) {
        console.error("Error sending email:", error);
        // Send error response only once
        return res.status(500).send({ message: "Failed to send email, please try again." });
    }
};

module.exports = maileSend;
