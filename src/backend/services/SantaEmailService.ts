import nodemailer from 'nodemailer';

const getEmailTransporter = () => {
  // Use environment variables for email configuration
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST_ID,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_AUTH_ID,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  });

  return transporter;
};

const sendEmail = async (
  from: string,
  to: string, 
  subject: string, 
  text: string,
  ) => {
  const transporter = getEmailTransporter();

  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export { sendEmail };
