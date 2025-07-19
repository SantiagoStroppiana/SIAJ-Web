import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

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
    const { email, planSeleccionado, precio } = req.body;

    console.log("=== DEBUG INFO ===");
    console.log("BODY:", { email, planSeleccionado, precio });
    
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      console.error("MERCADO_PAGO_ACCESS_TOKEN no está configurado");
      return res
        .status(500)
        .json({ message: "Configuración de MercadoPago faltante" });
    }

    if (!email || !planSeleccionado || !precio) {
      return res.status(400).json({ message: "Falta datos" });
    }

    const preference = await new Preference(client).create({
      items: [
        {
          title: planSeleccionado,
          quantity: 1,
          unit_price: parseFloat(precio),
          currency_id: "ARS",
        },
      ],
      payer: {
        email: email,
      },
      auto_return: "approved",
    //   back_urls: {
    //     success: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success`,
    //     failure: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/failure`,
    //   },
    //   auto_return: "approved",
    });

     console.log("Preferencia creada exitosamente:", preference.id);

    return res.status(200).json({ 
      preferenceId: preference.id,
      message: "Preferencia creada exitosamente"
    });
  } catch (error) {

     console.error("Error detallado al crear preferencia:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error response:", error.response?.data);
    console.error("Error al crear preferencia:", error);
    return res.status(500).json({
      message: "Error al crear preferencia",
      error: error.message,
    });
  }
}
