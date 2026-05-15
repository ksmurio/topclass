import nodemailer from 'nodemailer';

const sendVerificationEmail = async (email, code) => {

  if (process.env.NODE_ENV !== 'production') {
    console.log('\n=======================================');
    console.log('VERIFICATION EMAIL (dev mode)');
    console.log(`   To:   ${email}`);
    console.log(`   Code: ${code}`);
    console.log('========================================\n');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"TOPCLASS " <noreply@topclass.com>',
    to: email,
    subject: 'Confirma a tua conta - TopClass',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px;">
        <h2 style="color: #1a73e8;">Bem-vindo ao TopClass!</h2>
        <p>O teu código de confirmação é:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #1a73e8; padding: 20px 0;">
          ${code}
        </div>
        <p style="color: #888;">Introduz este código na página de confirmação para ativar a tua conta.</p>
      </div>
    `,
  });
};

export default sendVerificationEmail;