import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./formularioPago.css";

export function FormularioPago() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planSeleccionado = queryParams.get("plan") || "PLAN ESTÁNDAR";

  const [formData, setFormData] = useState({
    email: "",
    repetirEmail: "",
    celular: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, repetirEmail, celular } = formData;

    if (email !== repetirEmail) {
      alert("Los emails no coinciden");
      return;
    }

    try {
      const res = await fetch("/api/payment/crear-pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, celular, plan: planSeleccionado }),
      });

      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al generar el pago");
      }
    } catch (error) {
      console.error("Error al conectar con MercadoPago", error);
    }
  };

  return (
    <section className="contact" data-aos="fade-up">
      <div className="contact-container">
        <div className="contact-header" data-aos="fade-up">
          <h2 className="contact-title">Formulario de Compra Servicio</h2>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <h3 className="plan-name">Estás adquiriendo: {planSeleccionado}</h3>
            <h3 className="form-title">Formulario de pago</h3>
            <p className="form-subtitle">
              Llena el formulario y nos contactaremos en las proximas 24 hs
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu email"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Repetir Email</label>
                <input
                  type="email"
                  name="repetirEmail"
                  required
                  value={formData.repetirEmail}
                  onChange={handleInputChange}
                  placeholder="Ingresa nuevamente tu email"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Celular</label>
                <input
                  type="tel"
                  name="celular"
                  required
                  pattern="[0-9]{7,15}"
                  value={formData.celular}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu número de celular"
                  className="form-input"
                />
              </div>

              <button className="submit-btn" type="submit">
                Adquirir Plan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
