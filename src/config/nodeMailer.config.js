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
      subject: '유니버스 인증메일',
      html: `<p>귀하의 인증번호는 ${verifyCode} 입니다.</p>`,
      // 기타 HTML 내용 및 첨부 파일 구성
    };

    // 이메일 전송
    await transporter.sendMail(message);
  } catch (err) {
    console.error('nodeMailer Error', err);
    throw new Error('이메일 전송 중 오류 발생');
  }
};
