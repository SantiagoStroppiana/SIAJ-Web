import "./header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          {/* <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div> */}
          <img src="../../../public/img/siaj-logo.png" className="logo-icon"></img>
          <span className="logo-text">SIAJ Inventarios</span>
        </div>

        <nav className="nav">
          <Link className="nav-link" to={"/"}>
            Home
          </Link>
          <Link className="nav-link" to={"/servicios"}>
            Servicios
          </Link>
          <Link className="nav-link" to={"/sobreNosotros"}>
            Sobre Nosotros
          </Link>
          <Link className="nav-link" to={"/contacto"}>
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
