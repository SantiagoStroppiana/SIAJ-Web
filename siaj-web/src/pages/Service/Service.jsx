import "./servicio.css";
import { Service2 } from "./Service2";

export function Service() {
  const plans = [
    {
      name: "PLAN ESTÁNDAR",
      target: "Negocios pequeños",
      description: "",
      price: "$8 USD",
      period: "/mes",
      features: [
        "Soporte por email (48-72 hrs)",
        "2 usuarios principales",
        "Plantillas predefinidas",
        "Integración ARCA básica",
      ],
      buttonText: "Adquirir plan",
      isPopular: false,
    },
    {
      name: "PLAN AVANZADO",
      target: "Negocios en crecimiento",
      description: "",
      price: "$15 USD",
      period: "/mes",
      features: [
        "Todo lo del plan estándar",
        "Soporte prioritario (24 hrs)",
        "Hasta 5 usuarios",
        "Reportes avanzados y analytics",
        "Respaldo automático diario",
        "Plantillas personalizables",
        "Integración ARCA completa",
      ],
      buttonText: "Adquirir plan",
      isPopular: true,
    },
    {
      name: "PLAN PREMIUM",
      target: "Negocios establecidos",
      description: "",
      price: "$25 USD ",
      period: "/mes",
      features: [
        "Todo lo del plan avanzado",
        "Soporte 24/7",
        "Usuarios +25",
        "Integraciones avanzadas (APIs)",
      ],
      buttonText: "Adquirir plan",
      isPopular: false,
    },
  ];
  return (
    <>
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-header">
            <h2 className="pricing-title">Elegi tu plan</h2>
            <p className="pricing-description">
              Selecciona el plan que mas se ajuste a tus necesidades.
            </p>
            <p className="pricing-description">
              Funciones principales como gestion del inventario, gestion de
              proveedores y punto de venta
            </p>
          </div>

          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.isPopular ? "popular" : ""}`}
                data-aos="flip-left"
                data-aos-duration="1000"
              >
                {plan.isPopular && (
                  <div className="popular-badge">Recomendado</div>
                )}

                <div className="card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <h2 className="plan-target">{plan.target}</h2>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="price-section">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>

                <ul className="features-list">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item">
                      <svg
                        className="check-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`plan-button ${
                    plan.isPopular ? "popular-button" : ""
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
