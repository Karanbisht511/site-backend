import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const admin = process.env.admin;
const pass = process.env.adminPass;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: admin,
    pass: pass,
  },
});

export async function sendMail(from, subject, text) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: from, // sender address
    to: admin, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    // html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
