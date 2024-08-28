import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "mhmwdbhjt307@gmail.com",
      pass: "disxvqrqecngfvej",
    },
  });

  const info = await transporter.sendMail({
    from: '"Your App" <ma2372190@gamil.com>',
    to,
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
};
