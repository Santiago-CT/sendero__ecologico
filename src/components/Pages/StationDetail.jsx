import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './StationDetail.css';

const StationDetail = () => {
  // Ejemplo: obtener el ID de la estación de la URL (/station/:id)
  const { id } = useParams();

  // Estado para guardar la información de la estación
  const [station, setStation] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener la información de la estación según el ID
    // Ajusta la URL a tu backend real, por ejemplo /api/stations/:id
    axios.get(`http://localhost:4000/api/stations/${id}`)
      .then(response => {
        setStation(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la estación:', error);
      });
  }, [id]);

  if (!station) {
    return (
      <div className="station-loading">
        <p>Cargando información de la estación...</p>
      </div>
    );
  }

  return (
    <div className="station-detail-container">
      {/* Columna Izquierda: Imagen, título, descripción, íconos */}
      <div className="station-left">
        <h2 className="station-title">
          Información Estación {station.idEstacion || id}
        </h2>
        <h3 className="station-subtitle">
          {station.nombre} 
        </h3>
        <p className="station-meta">
          {station.descripcion || 'Manejo de Residuos Sólidos'}
        </p>

        {/* Imagen principal */}
        <div className="station-image-wrapper">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Estación"
            className="station-image"
          />
        </div>

        {/* Sección de íconos (opcional) */}
        <div className="station-icons">
          <div className="icon-box">
            <img src="https://via.placeholder.com/40" alt="Icon 1" />
            <p>Icon Name</p>
          </div>
          <div className="icon-box">
            <img src="https://via.placeholder.com/40" alt="Icon 2" />
            <p>Icon Name</p>
          </div>
          <div className="icon-box">
            <img src="https://via.placeholder.com/40" alt="Icon 3" />
            <p>Icon Name</p>
          </div>
          <div className="icon-box">
            <img src="https://via.placeholder.com/40" alt="Icon 4" />
            <p>Icon Name</p>
          </div>
        </div>

        {/* Texto adicional */}
        <div className="station-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacinia, 
            urna sit amet dictum varius, odio metus bibendum velit, non posuere odio 
            lorem sed justo.
          </p>
        </div>
      </div>

      {/* Columna Derecha: Mapa, botones (Especies, Comentar, Ver información) */}
      <div className="station-right">
        <h3 className="map-title">Ver ubicación</h3>
        <div className="map-wrapper">
          {/* Aquí podrías usar un mapa real con Leaflet o Google Maps.
              Por ahora, un placeholder: */}
          <img
            src="https://via.placeholder.com/300x300?text=Mapa+Estación"
            alt="Mapa Estación"
            className="map-image"
          />
        </div>

        <div className="station-actions">
          <Link to={`/species/${id}`} className="action-button">
            Especies
          </Link>
          <Link to={`/comments`} className="action-button">
            Comentar
          </Link>
          <Link to={`/station/${id}/info`} className="action-button">
            Ver información
          </Link>
        </div>

        {/* Texto inferior o descripción adicional */}
        <div className="station-footer-text">
          <p>
            Texto adicional o breve reseña. Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default StationDetail;
