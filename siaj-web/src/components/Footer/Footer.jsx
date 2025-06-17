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
           <a href="#" >Facebook</a> |
            <a href="#">Instagram</a> |
            <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
