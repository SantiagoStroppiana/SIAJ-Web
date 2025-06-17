import { Package, BarChart3, Zap, Truck, Shield, Users } from "lucide-react";


export function Service2() {
      const features = [
    {
      icon: <Package />,
      title: "Gestión Inventario",
      description:
        "Diseño simple e intuitivo pensado para cualquier persona, sin curva de aprendizaje.",
    },
    {
      icon: <BarChart3 />,
      title: "📊Informe y análisis",
      description:
        "Visualizá tus productos, ventas y movimientos con precisión y en tiempo real.",
    },
    {
      icon: <Zap />,
      title: "🌐 Sistema de Punto de Venta",
      description:
        "Entrá al sistema desde cualquier dispositivo con conexión a Internet.",
    },
      {
      icon: <Zap />,
      title: "🌐Sistema de Facturación",
      description:
        "Entrá al sistema desde cualquier dispositivo con conexión a Internet.",
    },
      {
      icon: <Zap />,
      title: "🌐 Sincronización tiempo real",
      description:
        "Entrá al sistema desde cualquier dispositivo con conexión a Internet.",
    },
      {
      icon: <Zap />,
      title: "Automatizacion y digitalizacion del Inventario",
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
