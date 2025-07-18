import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./formularioPago.css";

export function FormularioPago() {
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planSeleccionado = queryParams.get("plan");

  const [formData, setFormData] = useState({
    email: "",
    repetirEmail: "",
    celular: "",
  });

  const [isLoading,  setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if(!formData.email || !formData.repetirEmail || !formData.celular) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    setIsLoading(true);

    const apiUrl = `${import.meta.env.VITE_API_URL}/api/enviar-email-compra`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, planSeleccionado: planSeleccionado}),
      });

      const data = await response.json();

      if(!response.ok){
        alert ("Error desconocido " + data.message);
        return;
      }

      alert("Exito en la compra");

      setFormData({
        email: "",
        repetirEmail: "",
        celular: "",
      });
    
    } catch(error) {
      alert("Error al realizar el pago " + error.message);
      return;
    } finally {
      setIsLoading(false);
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

              <button className="submit-btn" type="submit"  disabled={isLoading}>
                 {isLoading ? "En proceso..." : "Aquirir producto"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
