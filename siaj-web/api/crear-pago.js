import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { email, planSeleccionado, precio } = req.body;

    console.log("=== DEBUG INFO ===");
    console.log("BODY:", { email, planSeleccionado, precio });

    if (!email || !planSeleccionado || !precio) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const precioNumerico = parseFloat(precio);

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: planSeleccionado.replace(/\s+/g, "-").toLowerCase(),
            title: planSeleccionado,
            description: `Plan ${planSeleccionado}`,
            quantity: 1,
            unit_price: precioNumerico,
            currency_id: "ARS",
            category_id: "services",
          },
        ],
        payer: {
          email: email,
        },
        payment_methods: {
          excluded_payment_methods: [],
          excluded_payment_types: [],
          installments: 12,
        },
        back_urls: {
          success: `${import.meta.env.VITE_API_URL}/gracias`,
        },
        auto_return: "approved",
      },
    });

    console.log("Preferencia creada:", preference.id);

    return res.status(200).json({
      preferenceId: preference.id,
      //   init_point: preference.init_point,
      message: "Preferencia creada exitosamente",
    });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    return res.status(500).json({
      message: "Error al crear preferencia",
      error: error.message,
      response: error.response?.data || null,
    });
  }
}
