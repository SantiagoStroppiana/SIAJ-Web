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

    if(!email || !planSeleccionado || !precio){
        return res.status(400).json({ message:"Falta datos"});
    }

    const preference = await new Preference(client).create({
        items: [
            {
                title: planSeleccionado,
                quantity: 1,
                currency_id: "USD",
                unit_price: parseFloat(precio),
            },
        ],
        payer: {
            email: email,
        },
        auto_return:"approved",
    });

    return res.status(200).json({ preferenceId: preference.id });

  } catch (error) {
    console.error("Error al crear preferencia:", error);
    return res.status(500).json({
      message: "Error al crear preferencia",
      error: error.message,
    });
  }
}
