import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
 host: process.env.NODEMAILER_HOST,
 port: process.env.NODEMAILER_PORT,
 secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export async function Main(text,subject,replyTo) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: [process.env.NODEMAILER_EMAIL,process.env.NODEMAILER_RECEIVER_EMAIL],
    subject:subject,
    text:text,
    replyTo: replyTo
  });
}