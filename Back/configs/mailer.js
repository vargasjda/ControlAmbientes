const nodemailer = require("nodemailer");

async function sendPasswordResetEmail(email, newPassword) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "tu_correo@gmail.com",
        pass: "tu_contraseña",
      },
    });

    const mailOptions = {
      from: "tu_correo@gmail.com",
      to: email,
      subject: "Recuperar Contraseña",
      text: `Tu nueva contraseña es: ${newPassword}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo electrónico enviado: ${info.messageId}`);
  } catch (error) {
    console.error(error);
  }
}

sendPasswordResetEmail("usuario@gmail.com", "nueva_contraseña");
