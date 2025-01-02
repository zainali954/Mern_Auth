import nodemailer from 'nodemailer'
import config from './config.js';
const transporter =  nodemailer.createTransport({
  host:"smtp.gmail.com",
  port: 587,
  auth:{
    user:config.SMTP_USER,
    pass:config.SMTP_PASS
  }
})

export default transporter;