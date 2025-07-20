import {
  ShoppingCart,
  Receipt,
  Package,
  BarChart3,
  Users,
  Database,
} from "lucide-react";

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
      icon: <ShoppingCart />,
      title: "🌐 Sistema de Punto de Venta",
      description: "Gestiona tu ventas desde un solo lugar.",
    },
    {
      icon: <Receipt />,
      title: "🌐Sistema de Facturación",
      description: "Facturación automatica con ARCA.",
    },
    {
      icon: <Database />,
      title: "🌐 Sincronización tiempo real",
      description:
        "Los movimientos de tu inventario se ven afectados por tu ventas e ingresos.",
    },
    {
      icon: <Users />,
      title: "Gestion con Proveedores",
      description: "Gestiona tus proveedores y genera ordenes de commpra.",
    },
  ];
  return (
    <>
      <section className="features">
        <div className="features-container">
          <div className="features-header" data-aos="fade-up">
            <h2 className="features-title">
              Nuestro software ofrece funciones como:
            </h2>
            {/* <p className="features-description">
              SIAJ ofrece funciones como:
            </p> */}
          </div>

          <div className="features-grid" data-aos="fade-up">
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
