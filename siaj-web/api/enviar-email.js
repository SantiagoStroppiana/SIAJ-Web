const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    console.log('Request body:', req.body);
    console.log('Environment variables check:', {
      hasGmailUser: !!process.env.GMAIL_USER,
      hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD
    });

    const { firstName, lastName, email, company, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ 
        message: "Faltan campos obligatorios: nombre, apellido, email y mensaje son requeridos" 
      });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing environment variables');
      return res.status(500).json({ 
        message: "Error de configuración del servidor" 
      });
    }

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.verify();

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
        <hr>
        <p><small>Enviado desde el formulario web</small></p>
      `,
      text: `
        Nombre: ${firstName} ${lastName}
        Email: ${email}
        Empresa: ${company || 'No especificada'}
        Mensaje: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      message: "Correo enviado exitosamente" 
    });
    
  } catch (error) {
    console.error("Error detallado:", error);
    
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        message: "Error de autenticación con Gmail",
        error: "Verifica las credenciales de Gmail"
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        message: "Error de conexión",
        error: "No se pudo conectar con el servidor de correo"
      });
    }

    return res.status(500).json({
      message: "Error al enviar el correo",
      error: error.message || "Error desconocido"
    });
  }
}