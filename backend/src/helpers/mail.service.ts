// helpers/sendMail.helper.ts
import * as nodemailer from 'nodemailer';

export async function sendMailHelper(
  to: string,
  subject: string,
  html: string,
): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Support Team" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error('Mail Error:', error);
    return false;
  }
}

// helpers/otp.helper.ts
export function generateOTP(length = 6): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

// helpers/emailTemplate.helper.ts
export function otpTemplate(otp: string): string {
  return `
    <div style="font-family: Arial; padding:20px">
      <h2>Password Reset OTP</h2>
      <p>Your OTP is:</p>
      <h1 style="color:#4CAF50">${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
    </div>
  `;
}