import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token //
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 86400000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 86400000,
      });
    }

    // create nodemailer transport //
    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '1499e1662917cd',
        pass: 'db2e4c4cc442dc',
      },
    });

    // create mail option //
    const mailOptions = {
      from: 'pkadif@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'
      } </br> or, Browse the link: </br>${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    //store mail resposnse //
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
