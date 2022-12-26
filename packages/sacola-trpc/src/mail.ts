require('dotenv').config();

import nodemailer from 'nodemailer';

export const mail = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: process.env.TONINHO_EMAIL,
    pass: process.env.TONINHO_PASS,
  },
});
