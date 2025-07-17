// import nodemailer from "nodemailer";

// export default async function  HandPlatter(req, res) {
//   if(req.method !== "POST") {
//     return res.status(405).json( {message: "Metodo invalido"} );
//   }

//   const { firstName, lastName, email, company, message } = req.body;

//   if (!email || !message) {
//     return res.status(400).json({ message: "Faltan campos obligatorios" });
//   }

//   try{

    
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: `"Formulario Web" <${process.env.GMAIL_USER}>`,
//       to: process.env.GMAIL_USER,
//       subject: `Nuevo mensaje de ${firstName} ${lastName}`,
//       text: `
//         Nombre: ${firstName} ${lastName}
//         Email: ${email}
//         Empresa: ${company}
//         Mensaje: ${message}
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({ message: "Correo enviado exitosamente" });


//   }catch(error){
//     console.error("Error al enviar el email", error);
//     return res.status(500).json({ message:"Error al enviar el email" });
//   }


// };


// api/enviar-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Configurar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST
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

    if (!email || !message) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing environment variables');
      return res.status(500).json({ message: "Error de configuración del servidor" });
    }

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Formulario Web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nuevo mensaje de ${firstName} ${lastName}`,
      text: `
        Nombre: ${firstName} ${lastName}
        Email: ${email}
        Empresa: ${company}
        Mensaje: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return res.status(500).json({ 
      message: "Error al enviar el correo",
      error: error.message 
    });
  }
}