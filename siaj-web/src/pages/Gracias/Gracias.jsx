import "./gracias.css";
import { Link } from "react-router-dom";

export function Gracias() {
  return (
    <section className="gracias">
      <div className="content-card">
        <div className="success-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>

        <h1 className="title">¡Gracias por tu compra!</h1>
        <p className="subtitle">Tu pedido ha sido procesado exitosamente</p>

        <div className="info-section">
          <div className="info-item">
            <div className="icon-wrapper">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <h3>Confirmación enviada</h3>
              <p>
                Recibirás un correo con los detalles de tu compra en los
                próximos minutos
              </p>
            </div>
          </div>
        </div>

        <div className="order-details">
          <h3>¿Qué sigue?</h3>
          <ul>
            <li>
              <div className="step-icon">1</div>
              <span>Revisa tu correo electrónico para la confirmación</span>
            </li>
            <li>
              <div className="step-icon">2</div>
              <span>Nuestro equipo se pondra en contacto en la brevedad</span>
            </li>
          </ul>
        </div>

        <div className="action-buttons">
          <Link className="nav-link" to="/">
            <button className="btn-primary">Volver al Menu</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
