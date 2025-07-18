import nodemailer from 'nodemailer';

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    
    const hasGmailUser = !!process.env.GMAIL_USER;
    const hasGmailPassword = !!process.env.GMAIL_APP_PASSWORD;
    
    if (!hasGmailUser || !hasGmailPassword) {
      console.error('Variables de entorno faltantes');
      return res.status(500).json({
        message: 'Error de configuración del servidor',
        debug: { hasGmailUser, hasGmailPassword }
      });
    }

    const { firstName, lastName, email, company, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ 
        message: 'Faltan campos obligatorios',
        received: { firstName, lastName, email, company, message }
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.verify();
    } catch (verifyError) {
      return res.status(500).json({
        message: 'Error de conexión con el servidor de correo',
        error: verifyError.message
      });
    }

    const mailOptions = {
      from: `"Formulario Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nuevo mensaje de ${firstName} ${lastName}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    };


    const info = await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ 
      message: 'Correo enviado exitosamente',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('ERROR COMPLETO:', error);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({
      message: 'Error al enviar el correo',
      error: error.message,
      stack: error.stack
    });
  }
}