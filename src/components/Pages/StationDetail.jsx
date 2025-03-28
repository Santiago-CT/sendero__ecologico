import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './StationDetail.css';

// Configuración de un icono personalizado para el marcador (opcional)
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const StationDetail = () => {
  const { id } = useParams();
  const [station, setStation] = useState(null);

  useEffect(() => {
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

  // Supongamos que la estación tiene coordenadas (lat, lng)
  const position = [station.lat || 4.60971, station.lng || -74.08175]; // Valor por defecto, cámbialo según tus datos

  return (
    <div className="station-detail-container">
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
        <div className="station-image-wrapper">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Estación"
            className="station-image"
          />
        </div>
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
        <div className="station-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacinia, urna sit amet dictum varius, odio metus bibendum velit, non posuere odio lorem sed justo.
          </p>
        </div>
      </div>

      <div className="station-right">
        <h3 className="map-title">Ver ubicación</h3>
        <div className="map-wrapper">
          <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
              <Popup>
                {station.nombre} <br /> {station.descripcion}
              </Popup>
            </Marker>
          </MapContainer>
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

        <div className="station-footer-text">
          <p>
            Texto adicional o breve reseña. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StationDetail;
