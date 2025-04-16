import nodemailer from 'nodemailer';

function SendMail(toEmail, message, subject, senderName) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pk8775331@gmail.com',
      pass: 'wywu jixe qinz cema', 
    },
  });

  const mailOptions = {
    from: `"${senderName}" <pk8775331@gmail.com>`,
    to: 'pk8775331@gmail.com',
    subject: subject,
    text: `${message}\n\nFrom: ${senderName}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #d32f2f;">${subject}</h2>
        <p style="font-size: 16px;">${message}</p>
        <br/>
        <p><strong>From:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${toEmail}</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending mail:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export default SendMail;
