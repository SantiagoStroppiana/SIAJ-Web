import nodemailer from "nodemailer";

const crearTemplateEmail = (type, data) => {
  const baseStyles = ` <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #0f172a;;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #5a5a5aff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .header {
        background: linear-gradient(135deg, #0F4C44 0%, #1E293B 50%, #0F172A 100%);
        padding: 30px;
        text-align: center;
        color: white;
      }
      .logo-section {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
      }
      .logo-placeholder {
        width: 60px;
        height: 60px;
        background-color: rgba(255,255,255,0.2);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        font-weight: bold;
        font-size: 24px;
      }
      .company-name {
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.5px;
      }
      .company-tagline {
        font-size: 14px;
        opacity: 0.9;
        margin: 5px 0 0 0;
      }
      .content {
        padding: 40px 30px;
      }
      .greeting {
        font-size: 18px;
        color: #333;
        margin-bottom: 20px;
      }
      .message-body {
        color: #555;
        font-size: 16px;
        margin-bottom: 30px;
      }
      .info-box {
        background-color: #888888bd;
        border-left: 4px solid #2fb614ff;
        padding: 20px;
        margin: 20px 0;
        border-radius: 0 4px 4px 0;
      }
      .info-row {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
      }
      .info-label {
        font-weight: 600;
        color: #333;
        min-width: 100px;
        margin-right: 15px;
      }
      .info-value {
        color: #555;
        flex: 1;
      }
      .signature {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 2px solid #f0f0f0;
      }
      .signature-name {
        font-weight: 600;
        color: #333;
        font-size: 16px;
      }
      .signature-title {
        color: #66ea78ff;
        font-size: 14px;
        margin: 5px 0;
      }
      .footer {
        background-color: #f8f9fa;
        padding: 25px 30px;
        text-align: center;
        color: #666;
        font-size: 13px;
        border-top: 1px solid #e9ecef;
      }
      .contact-info {
        margin: 10px 0;
      }
      .social-links {
        margin: 15px 0;
      }
      .social-links a {
        display: inline-block;
        margin: 0 10px;
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
      }
      .message-highlight {
        background: #fff;
        padding: 15px;
        border-radius: 4px;
        border: 1px solid #e9ecef;
        margin-top: 10px;
      }
      .action-required {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        color: #856404;
        padding: 15px;
        border-radius: 4px;
        margin-top: 20px;
      }
      @media (max-width: 600px) {
        .email-container {
          margin: 10px;
          border-radius: 4px;
        }
        .header, .content, .footer {
          padding: 20px;
        }
        .logo-section {
          flex-direction: column;
          text-align: center;
        }
        .logo-placeholder {
          margin-right: 0;
          margin-bottom: 10px;
        }
        .info-row {
          flex-direction: column;
          align-items: flex-start;
        }
        .info-label {
          margin-bottom: 5px;
        }
      }
    </style>
  `;

  if (type === "confirmation") {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de mensaje recibido</title>
        ${baseStyles}
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo-section">
              <div class="logo-placeholder">S</div>
              <div>
                <h1 class="company-name">SIAJ-Inventarios</h1>
                <p class="company-tagline">Gestión Profesional de Inventarios</p>
              </div>
            </div>
          </div>
          
          <div class="content">
            <div class="greeting">
              ¡Gracias por comprar ${data.planSeleccionado}!
            </div>
            
            <div class="message-body">
              Hemos recibido tu comprobante de pago correctamente y nos pondremos en contacto contigo a la brevedad posible.
            </div>
            
            <div class="signature">
              <div class="signature-name">Equipo SIAJ-Inventarios</div>
              <div class="signature-title">Atención al Cliente</div>
            </div>
          </div>
          
          <div class="footer">
            <div class="contact-info">
              <strong>SIAJ-Inventarios</strong><br>
              📧 info@siaj-inventarios.com | 📞 +54 11 1234-5678<br>
              📍 Buenos Aires, Argentina
            </div>
            
            <div class="social-links">
              <a href="#" style="color: #667eea; text-decoration: none;">LinkedIn</a> |
              <a href="#" style="color: #667eea; text-decoration: none;">Twitter</a> |
              <a href="#" style="color: #667eea; text-decoration: none;">Web</a>
            </div>
            
            <div style="margin-top: 15px; font-size: 11px; color: #999;">
              Este correo fue enviado automáticamente. Por favor no respondas a esta dirección.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  if (type === "admin") {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo mensaje de contacto</title>
        ${baseStyles}
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo-section">
              <div class="logo-placeholder">S</div>
              <div>
                <h1 class="company-name">SIAJ-Inventarios</h1>
                <p class="company-tagline">Panel de Administración</p>
              </div>
            </div>
          </div>
          
          <div class="content">
            <div class="greeting">
              🔔 Nueva compra de ${data.planSeleccionado}
            </div>
            
            <div class="info-box">
              <h3 style="margin: 0 0 15px 0; color: #333;">Datos del cliente:</h3>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${data.email}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Celular:</span>
                <span class="info-value">${data.celular}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Fecha:</span>
                <span class="info-value">${new Date().toLocaleString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })} hs</span>
              </div>
            </div>
            
            <div class="action-required">
              <strong>⚡ Acción requerida:</strong> Responder al cliente en las próximas 24 horas.
            </div>
          </div>
          
          <div class="footer">
            <div>Sistema automatizado SIAJ-Inventarios</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
};

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

    const { email, repetirEmail, celular, planSeleccionado } = req.body;

    if (!email || !repetirEmail || !celular) {
      return res.status(400).json({
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

    const emailData = { email, celular, planSeleccionado };

    const adminMailOptions = {
      from:  `"Confirmación compra de Plan" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject:`🔔 Nueva Compra de ${planSeleccionado} - SIAJ Inventarios`,
      html: crearTemplateEmail('admin', emailData),
    };

    const userEmailOptions  =  {
      from: `"Confirmación de compra de Plan" <${process.env.GMAIL_USER}>`,
      to: email,
      subject:`✅ Confirmación Compra de ${planSeleccionado} - SIAJ Inventarios`,
      html: crearTemplateEmail('confirmation', emailData),
    };


    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userEmailOptions),
    ]);

    return res.status(200).json({
      message: "Correo enviado exitosamente",
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al enviar",
      error: error.message,
      stack: error.stack,
    });
  }
}
