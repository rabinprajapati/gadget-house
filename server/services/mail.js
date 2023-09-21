const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const mailer = async (email, token) => {
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER, // sender address
    to: email, // list of receivers
    subject: "OTP verification", // Subject line
    html: `<div>Your otp is ${token}</div>`, // html body
  });
};

module.exports = { mailer };
