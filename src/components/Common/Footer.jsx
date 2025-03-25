import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© 2025 Universidad de los Llanos – Campus Barcelona</p>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Política de Privacidad</a>
          <a href="/terms" className="footer-link">Términos y Condiciones</a>
          <a href="/accessibility" className="footer-link">Accesibilidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
