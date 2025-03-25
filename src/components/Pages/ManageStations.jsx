
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageStations.css';

function ManageStations() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  // Campos del formulario
  const [stationName, setStationName] = useState('');
  const [stationDescription, setStationDescription] = useState('');
  const [stationLocation, setStationLocation] = useState('');
  const [stationImage, setStationImage] = useState('');

  // Para filtrar la lista de estaciones
  const [searchText, setSearchText] = useState('');

  // Cargar la lista de estaciones al montar el componente
  useEffect(() => {
    axios.get('http://localhost:4000/api/stations')
      .then(response => {
        setStations(response.data);
      })
      .catch(error => {
        console.error('Error al obtener estaciones:', error);
      });
  }, []);

  // Filtrar la lista según searchText
  const filteredStations = stations.filter(st => {
    const nameLower = st.nombre?.toLowerCase() || '';
    const searchLower = searchText.toLowerCase();
    return nameLower.includes(searchLower);
  });

  // Maneja la selección de una estación para edición
  const handleSelectStation = (station) => {
    setSelectedStation(station);
    setStationName(station.nombre || '');
    setStationDescription(station.descripcion || '');
    setStationLocation(station.ubicacion || '');
    setStationImage(station.imagen || '');
  };

  // Limpia el formulario y la estación seleccionada
  const clearForm = () => {
    setSelectedStation(null);
    setStationName('');
    setStationDescription('');
    setStationLocation('');
    setStationImage('');
  };

  // Maneja el envío del formulario (crear o actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedStation) {
      // Actualizar estación (PUT)
      axios.put(`http://localhost:4000/api/stations/${selectedStation.idEstacion}`, {
        nombre: stationName,
        descripcion: stationDescription,
        ubicacion: stationLocation,
        imagen: stationImage
      })
        .then(response => {
          // Actualizar la lista local
          const updatedList = stations.map(st =>
            st.idEstacion === selectedStation.idEstacion ? response.data : st
          );
          setStations(updatedList);
          clearForm();
        })
        .catch(error => {
          console.error('Error al actualizar estación:', error);
        });
    } else {
      // Crear nueva estación (POST)
      axios.post('http://localhost:4000/api/stations', {
        nombre: stationName,
        descripcion: stationDescription,
        ubicacion: stationLocation,
        imagen: stationImage
      })
        .then(response => {
          setStations([...stations, response.data]);
          clearForm();
        })
        .catch(error => {
          console.error('Error al crear estación:', error);
        });
    }
  };

  return (
    <div className="manage-stations-container">
      <h2 className="manage-title">Manage Stations</h2>

      <div className="manage-content">
        {/* Lista de Estaciones (columna izquierda) */}
        <div className="stations-list">
          <div className="stations-search">
            <input
              type="text"
              placeholder="Buscar estación..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="stations-items">
            {filteredStations.map(station => (
              <div
                key={station.idEstacion}
                className="station-item"
                onClick={() => handleSelectStation(station)}
              >
                <img
                  src={station.imagen || 'https://via.placeholder.com/150'}
                  alt={station.nombre}
                  className="station-thumb"
                />
                <p className="station-item-title">{station.nombre}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario (columna derecha) */}
        <div className="stations-form">
          {selectedStation ? (
            <h3>Editar Estación #{selectedStation.idEstacion}</h3>
          ) : (
            <h3>Agregar Nueva Estación</h3>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre Estación</label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={stationDescription}
                onChange={(e) => setStationDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Ubicación</label>
              <input
                type="text"
                value={stationLocation}
                onChange={(e) => setStationLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Imagen (URL)</label>
              <input
                type="text"
                value={stationImage}
                onChange={(e) => setStationImage(e.target.value)}
              />
            </div>

            <button type="submit" className="form-submit">
              {selectedStation ? 'Actualizar Estación' : 'Agregar Estación'}
            </button>

            {selectedStation && (
              <button
                type="button"
                className="form-cancel"
                onClick={clearForm}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageStations;
