import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/img/siaj-logo.png" alt="SIAJ Logo" className="logo-icon" />
          <span className="logo-text">SIAJ Inventarios</span>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link 
            className="nav-link" 
            to="/" 
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link 
            className="nav-link" 
            to="/servicios" 
            onClick={handleLinkClick}
          >
            Servicios
          </Link>
          <Link 
            className="nav-link" 
            to="/sobreNosotros" 
            onClick={handleLinkClick}
          >
            Sobre Nosotros
          </Link>
          <Link 
            className="nav-link" 
            to="/contacto" 
            onClick={handleLinkClick}
          >
            Contacto
          </Link>
        </nav>

        {isMenuOpen && (
          <div 
            className="nav-overlay" 
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
}