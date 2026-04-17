import nodemailer from 'nodemailer';

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  return transporter;
};

const sendVerificationEmail = async (email, code) => {
  const transport = await getTransporter();

  const info = await transport.sendMail({
    from: '"TOPCLASS 🎓" <noreply@topclass.com>',
    to: email,
    subject: 'Confirma a tua conta - TopClass',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px;">
        <h2 style="color: #1a73e8;">Bem-vindo ao TopClass!</h2>
        <p>O teu código de confirmação é:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #1a73e8 ; padding: 20px 0;">
          ${code}
        </div>
        <p style="color: #888;">Introduz este código na página de confirmação para ativar a tua conta.</p>
      </div>
    `,
  });


  console.log('\nEmail de verificação enviado!');
  console.log('Abre este link para ver o email: ' + nodemailer.getTestMessageUrl(info));
  console.log('');
};

export default sendVerificationEmail;