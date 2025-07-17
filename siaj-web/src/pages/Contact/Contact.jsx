import "./contact.css";
import React, { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    setIsLoading(true);

    const apiUrl = `${import.meta.env.VITE_API_URL}/api/enviar-email`;
    console.log('API URL:', apiUrl);
    console.log('Form data:', formData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);
      
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.log('Response as text:', textResponse);
        alert('Error: La respuesta del servidor no es válida. Ver consola.');
        return;
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        alert("Error: " + (data.message || 'Error desconocido'));
        return;
      }

      alert("¡Correo enviado correctamente! Nos contactaremos contigo pronto.");
      
      // Limpiar formulario
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
      });
      
    } catch (error) {
      console.error('Fetch error:', error);
      alert("Error al enviar el mensaje: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact" data-aos="fade-up">
      <div className="contact-container">
        <div className="contact-header" data-aos="fade-up">
          <h2 className="contact-title">Contacta con nosotros</h2>
          <p className="contact-description">
            ¿Listo para renovar como gestionar tu inventario? <br />
            Contacta con nosotros para recibir asesoramiento.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <h3 className="form-title">Contacto</h3>
            <p className="form-subtitle">
              Llena el formulario y nos contactaremos en las próximas 24 hs.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu nombre"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu apellido"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu email"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nombre de tu PyME</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Ingresa el nombre de tu PyME"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mensaje *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tu mensaje..."
                  className="form-textarea"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}