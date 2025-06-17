import "./home.css";
import { Package, BarChart3, Zap, Truck, Shield, Users } from "lucide-react";
import { Contact } from '../Contact/Contact';
import { Service } from '../Service/Service';

export function Home() {
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
  ];

  return (
    <div className="home" data-aos="fade-up">
      <section className="hero">
        <div className="hero-container">
          <div className="hero-badge">Software de Inventarios</div>

          <h1 className="hero-title">
            Optimiza tu Inventario con{" "}
            <span className="hero-brand">SIAJ</span>
          </h1>

          <p className="hero-description">
        Tome el control de la gestión de su inventario con nuestro software. Una solución digital simple, poderosa y accesible para PyMEs. 
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              Pruebe AHORA
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn-secondary">Descargar Demo</button>
          </div>
        </div>
      </section>

      <section className="features" data-aos="fade-up">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              ¿Por qué elegirnos?
            </h2>
            <p className="features-description">
             Con SIAJ te ofrecemos una herramienta moderna, intuitiva y efectiva para que gestiones tu inventario sin complicaciones
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

      <Service />

      <Contact />

    </div>
  );
}
