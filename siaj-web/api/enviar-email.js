// api/enviar-email.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config({ path: './.env' });

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.post("/api/enviar-email", async (req, res) => {
  const { firstName, lastName, email, company, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const transporter = nodemailer.createTransport({
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
    return res.status(500).json({ message: "Error al enviar el correo" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
