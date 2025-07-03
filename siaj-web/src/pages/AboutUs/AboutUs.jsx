import "./aboutus.css";
import { Link } from "react-router-dom";

export function AboutUs() {
  return (
    <>
      <section className="about-section">
        <div className="about-container">
          <div className="about-content" data-aos="fade-up">
            <h2 className="about-title">Sobre Nosotros</h2>
            <p className="about-description">
              Somos un equipo de desarrolladores compuesto por:
            </p>

            <div className="team-list">
              <div className="team-member">
                <span className="member-icon">👨‍💻</span>
                <span className="member-name">Iván Bilkis</span>
              </div>
              <div className="team-member">
                <span className="member-icon">👨‍💻</span>
                <span className="member-name">Joao Mateus Galarza Ruiz</span>
              </div>
              <div className="team-member">
                <span className="member-icon">👨‍💻</span>
                <span className="member-name">Alejo Nassif</span>
              </div>
              <div className="team-member">
                <span className="member-icon">👨‍💻</span>
                <span className="member-name">Santiago Rodríguez Thea</span>
              </div>
              <div className="team-member">
                <span className="member-icon">👨‍💻</span>
                <span className="member-name">Santiago Agustín Stroppiana</span>
              </div>
            </div>
          </div>

          <div className="about-image" data-aos="fade-up">
            <div className="image-placeholder">
              <img
                src="/img/a1.jpg"
                alt="Equipo de desarrollo"
                className="team-image"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="about-section2">
        <div className="about-container">
          <div className="about-content" data-aos="fade-up">
            <h2 className="about-title">Nuestra Misión</h2>
            <p className="about-description">
              SIAJ surge como un proyecto con el objetivo y misión de ayudar a
              las pequeñas y medianas empresas a modernizar sus sistemas de
              inventario, ofreciendo soluciones intuitivas, seguras y
              accesibles.
            </p>
          </div>
          <div className="mission-stats" data-aos="fade-up">
            <div className="stats-grid">
              <div className="stat-card">
                <h3 className="stat-number">Beta</h3>
                <p className="stat-label">Versión Actual</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-number">2025</h3>
                <p className="stat-label">Lanzamiento Oficial</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-number">100%</h3>
                <p className="stat-label">Desarrollado en Argentina</p>
              </div>
            </div>
            <div className="innovation-badges">
              <div className="badge">
                <span className="badge-icon">🚀</span>
                <span className="colorBlanco">Próximo Lanzamiento</span>
              </div>
              <div className="badge">
                <span className="badge-icon">⚡</span>
                <span className="colorBlanco">Tecnología de Vanguardia</span>
              </div>
              <div className="badge">
                <span className="badge-icon">🔧</span>
                <span className="colorBlanco">En Desarrollo Activo</span>
              </div>
            </div>
            <div className="cta-buttons">
              <button className="btn-primary">Solicitar DEMO Beta</button>
              <Link to={"/contacto"}>
                <button className="btn-secondary">Contactar</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
