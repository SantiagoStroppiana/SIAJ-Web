import nodemailer from "nodemailer";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodo no permitido" });
  }

  try {
    const hasGmailUser = !!process.env.GMAIL_USER;
    const hasGmailPassword = !!process.env.GMAIL_APP_PASSWORD;

    if (!hasGmailUser || !hasGmailPassword) {
      return res.status(500).json({
        message: "Error de configuracion",
      });
    }

    const { email, repetirEmail, celular , planSeleccionado} = req.body;

    if (!email || !repetirEmail || !celular) {
      return res
        .status(400)
        .json({
          message: "Falta campos obligatorios",
          received: { email, repetirEmail, celular },
        });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.verify();
    } catch (verifyError) {
      return res.status(500).json({
        message: "Error de conexion con el servidor",
        error: verifyError.message,
      });
    }

    const mailOptions = {
      from: `"Formulario de Pago" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `NUEVA COMPRA DE ${planSeleccionado}`,
      html: `
        <h2>Informacion contacto cliente</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Celular Contacto:</strong> ${celular}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({
        message: 'Correo enviado con exito',
        messageId: info.messageId
    });

  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error al enviar",
        error: error.message,
        stack: error.stack,
      });
  }
}
