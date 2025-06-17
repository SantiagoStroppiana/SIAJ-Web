import { Mail, Phone, MapPin, Clock } from "lucide-react";
import "./contact.css";
import React, { useState } from 'react';


export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
    });
  };
  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Contacta con nosotros</h2>
          <p className="contact-description">
            Listo para renovar como gestionar tu inventario? <br/>
            Contacta con nosotros para recibir asesoramiento.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h3 className="form-title">Contacto</h3>
            <p className="form-subtitle">
             Llena el formulario y nos contactaremos en las proximas 24 hs.
            </p>

            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu nombre"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu apellido"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ingresa tu email"
                  className="form-input"
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
                <label className="form-label">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tu mensaje..."
                  className="form-textarea"
                  rows="4"
                ></textarea>
              </div>

              <button onClick={handleSubmit} className="submit-btn">
                Enviar Mensaje
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
