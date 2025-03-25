import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Sendero Ecológico</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/StationDetail" className="nav-link">Estaciones</Link>
          <Link to="/filter" className="nav-link">Especies</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </nav>
        <div className="auth">
          <Link to="/login" className="auth-link">Iniciar Sesión</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
