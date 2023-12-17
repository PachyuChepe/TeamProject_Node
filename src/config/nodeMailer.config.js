// config/nodeMailer.config.js
import nodemailer from 'nodemailer';
import env from './env.config.js';

export const sendVerificationEmail = async (email, verifyCode) => {
  try {
    // nodemailer로 이메일 전송을 위한 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: env.NODE_MAIL_ID,
        pass: env.NODE_MAIL_PW,
      },
    });

    // 전송할 이메일 내용
    const message = {
      from: env.NODE_MAIL_ID,
      to: `<${email}>`,
      subject: '아이도리 인증메일',
      html: `
      <div style='
      margin: 0 auto 0 auto;
      padding: 3.5% 0 5% 0;
      text-align: center;
      border: 0.5px solid #ececec;
      height: 50%;
      width: 50%;
      '>

      
      <span style="
      font-size: 30pt;
      border: 0.5px solid #ececec;
      padding: 0.5% 2.5%;
      font-weight:bold;
      ">${verifyCode}</span>
      <br/>
      <h2>인증번호는 3분간 유효합니다.</h2><br/><br/><br/>
      <h4 style="
      color: gray;
      ">
      &copy; Copyright aidori, 2023 All Rights Reserved.
      </h4>
      </div>`,
      // attachments: [
      //   {
      //     filename: 'aidori-nodeMailer.png',
      //     path: '../TeamProject_Node_Ojyosama/views/img/aidori-nodeMailer.png',
      //     cid: 'aidori-nodeMailer',
      //   },
      // ],
    };

    // 이메일 전송
    await transporter.sendMail(message);
  } catch (err) {
    console.error('nodeMailer Error', err);
    throw new Error('이메일 전송 중 오류 발생');
  }
};
