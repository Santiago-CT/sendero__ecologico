import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Filter.css';

const Filter = () => {
  // Estado para la lista completa de especies
  const [allSpecies, setAllSpecies] = useState([]);
  // Estado para la lista filtrada
  const [filteredSpecies, setFilteredSpecies] = useState([]);

  // Filtros
  const [selectedType, setSelectedType] = useState([]); // 'fauna', 'flora', etc.
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // Ej. 'newest', 'oldest', etc.

  // useEffect para cargar la lista de especies (fauna + flora)
  useEffect(() => {
    // Ajusta la URL a tu backend o usa mock data
    axios.get('http://localhost:4000/api/species') 
      .then(response => {
        setAllSpecies(response.data);
        setFilteredSpecies(response.data);
      })
      .catch(error => {
        console.error('Error al obtener especies:', error);
      });
  }, []);

  // Función para aplicar los filtros al array de allSpecies
  const applyFilters = () => {
    let result = [...allSpecies];

    // 1. Filtrar por tipo (fauna, flora)
    if (selectedType.length > 0) {
      result = result.filter(item => selectedType.includes(item.type));
    }

    // 2. Filtrar por texto (búsqueda)
    if (searchText.trim() !== '') {
      const searchLower = searchText.toLowerCase();
      result = result.filter(item =>
        item.nombre.toLowerCase().includes(searchLower) ||
        item.descripcion.toLowerCase().includes(searchLower)
      );
    }

    // 3. Ordenar
    if (sortOrder === 'newest') {
      // Ejemplo: asumiendo que item.tiempoCreacion es una fecha
      result.sort((a, b) => new Date(b.tiempoCreacion) - new Date(a.tiempoCreacion));
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => new Date(a.tiempoCreacion) - new Date(b.tiempoCreacion));
    }
    // Podrías agregar más criterios (alfabético, etc.)

    setFilteredSpecies(result);
  };

  // Efecto que se dispara cuando cambian los filtros
  useEffect(() => {
    applyFilters();
  }, [selectedType, searchText, sortOrder]);

  // Maneja selección de tipo (fauna, flora)
  const handleTypeChange = (typeValue) => {
    // Si ya está seleccionado, lo quita; si no, lo agrega
    if (selectedType.includes(typeValue)) {
      setSelectedType(selectedType.filter(t => t !== typeValue));
    } else {
      setSelectedType([...selectedType, typeValue]);
    }
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setSelectedType([]);
    setSearchText('');
    setSortOrder('newest');
  };

  return (
    <div className="filter-container">
      <header className="filter-header">
        <div className="filter-options">
          {/* Filtro por tipo */}
          <span>Filter: </span>
          <label>
            <input
              type="checkbox"
              checked={selectedType.includes('fauna')}
              onChange={() => handleTypeChange('fauna')}
            />
            fauna
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedType.includes('flora')}
              onChange={() => handleTypeChange('flora')}
            />
            flora
          </label>

          {/* Búsqueda por texto */}
          <label className="filter-search">
            Text:
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
            />
          </label>

          {/* Botón Clear All */}
          <button onClick={clearAllFilters} className="clear-button">
            Clear all
          </button>
        </div>

        {/* Ordenar */}
        <div className="filter-sort">
          <span>Sort: </span>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            {/* Agrega más opciones si deseas */}
          </select>
        </div>
      </header>

      {/* Contador de resultados */}
      <div className="results-info">
        Showing {filteredSpecies.length} results
      </div>

      {/* Grid de resultados */}
      <div className="species-grid">
        {filteredSpecies.map((item) => (
          <div key={item.id} className="species-card">
            <div className="species-image-wrapper">
              <img
                src={item.imagen || 'https://via.placeholder.com/150'}
                alt={item.nombre}
                className="species-image"
              />
            </div>
            <div className="species-content">
              <h4 className="species-name">{item.nombre}</h4>
              <p className="species-type">Type: {item.type}</p>
              <p className="species-description">
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
