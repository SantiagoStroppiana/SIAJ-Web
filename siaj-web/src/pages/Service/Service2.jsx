import { Package, BarChart3, Zap, Truck, Shield, Users } from "lucide-react";


export function Service2() {
      const features = [
    {
      icon: <Package />,
      title: "✅ Fácil de usar",
      description:
        "Diseño simple e intuitivo pensado para cualquier persona, sin curva de aprendizaje.",
    },
    {
      icon: <BarChart3 />,
      title: "📊 Control total del stock",
      description:
        "Visualizá tus productos, ventas y movimientos con precisión y en tiempo real.",
    },
    {
      icon: <Zap />,
      title: "🌐 Acceso desde cualquier lugar",
      description:
        "Entrá al sistema desde cualquier dispositivo con conexión a Internet.",
    },
      {
      icon: <Zap />,
      title: "🌐 Acceso desde cualquier lugar",
      description:
        "Entrá al sistema desde cualquier dispositivo con conexión a Internet.",
    },
      {
      icon: <Zap />,
      title: "🌐 Acceso desde cualquier lugar",
      description:
        "Entrá al sistema desde cualquier dispositivo con conexión a Internet.",
    },
      {
      icon: <Zap />,
      title: "🌐 Acceso desde cualquier lugar",
      description:
        "Entrá al sistema desde cualquier dispositivo con conexión a Internet.",
    },
  ];
  return (
    <>
      <section className="features">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Funciones</h2>
            <p className="features-description">
              SIAJ ofrece funciones como:
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
