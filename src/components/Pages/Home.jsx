import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <main className="mainContainer">
      {/* Sección Hero con Imagen de Fondo */}
      <section className="heroSection">
        <div className="heroOverlay">
          <h1 className="heroTitle">Sendero Ecológico</h1>
          <p className="heroSubtitle">
            Vive una experiencia única explorando las estaciones 4, 5 y 6.
          </p>
          <button className="heroButton">Explorar Estaciones</button>
        </div>
      </section>

      {/* Sección de Estaciones */}
      <section className="stationsContainer">
        <div className="stationCard">
          <img
            src="https://via.placeholder.com/600x300"
            alt="Estación 4"
            className="stationImage"
          />
          <div className="stationInfo">
            <h2 className="stationTitle">Estación 4: Manejo de Residuos Sólidos</h2>
            <p className="stationText">
              Descubre manejo sostenible de residuos.
            </p>
            <div className="stationActions">
              <button className="buttonPrimary">Ver Detalles</button>
              <button className="buttonSecondary">Comentar</button>
            </div>
          </div>
        </div>

        <div className="stationCard">
          <img
            src="https://via.placeholder.com/600x300"
            alt="Estación 5"
            className="stationImage"
          />
          <div className="stationInfo">
            <h2 className="stationTitle">Estación 5: Rata del Bambú</h2>
            <p className="stationText">
              Explora la vida del Bambú.
            </p>
            <div className="stationActions">
              <button className="buttonPrimary">Explorar</button>
              <button className="buttonSecondary">Comentar</button>
            </div>
          </div>
        </div>

        <div className="stationCard">
          <img
            src="https://via.placeholder.com/600x300"
            alt="Estación 6"
            className="stationImage"
          />
          <div className="stationInfo">
            <h2 className="stationTitle">Estación 6: Coral</h2>
            <p className="stationText">
              Conoce el canal y su biodiversidad.
            </p>
            <div className="stationActions">
              <button className="buttonPrimary">Visitar</button>
              <button className="buttonSecondary">Comentar</button>
            </div>
          </div>
        </div>
      </section>

      {/* Pie de Página */}
      <section className="footerSection">
        <p>© 2025 Universidad de los Llanos – Campus Barcelona</p>
        <p>
          <Link to="/admin">Admin</Link> | 
          <Link to="/privacy">Política de Privacidad</Link> | 
          <Link to="/terms">Términos y Condiciones</Link> | 
          <Link to="/accessibility">Accesibilidad</Link>
        </p>
      </section>
    </main>
  );
};

export default Home;
