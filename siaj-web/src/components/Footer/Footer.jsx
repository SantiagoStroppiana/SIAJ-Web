import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="copyright">
            © 2024 SIAJ Inventorios. Todos los derechos reservados.
          </span>
        </div>

        <div className="footer-right">
          <a href="#terms" className="footer-link">
            Terminos de servicio
          </a>
          <a href="#privacy" className="footer-link">
            Politicas de Privacidad
          </a>
          
          <div className="social-links">
            <a href="#" className="social-link facebook">
              <i className="fab fa-facebook-f"></i>
              Facebook
            </a>
            <a href="#" className="social-link instagram">
              <i className="fab fa-instagram"></i>
              Instagram
            </a>
            <a href="#" className="social-link linkedin">
              <i className="fab fa-linkedin-in"></i>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}