import React, { useState } from 'react';
import { FiYoutube, FiInfo, FiX, FiFilter } from 'react-icons/fi';
import routines from '../data/routines';

const Routines = ({ onSelectExercise }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Obtener categorías únicas
  const categories = ['all', ...new Set(routines.map(ex => ex.category))];

  // Filtrar ejercicios
  const filteredExercises = routines.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || exercise.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="routines-container">
      <div className="routines-header">
        <h2>Rutinas de Ejercicio</h2>
        <p>Selecciona un ejercicio para ver los detalles</p>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar ejercicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Filtros"
          >
            <FiFilter />
          </button>
        </div>

        {showFilters && (
          <div className="filters">
            <label>
              Categoría:
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="category-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Todas las categorías' : cat}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>

      <div className="exercises-grid">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card">
            <div className="exercise-image">
              <img src={exercise.image} alt={exercise.name} />
            </div>
            <div className="exercise-info">
              <h3>{exercise.name}</h3>
              <span className="category-tag">{exercise.category}</span>
              <p>{exercise.description}</p>
              <div className="exercise-actions">
                <button 
                  className="btn-details"
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <FiInfo /> Detalles
                </button>
                <a 
                  href={exercise.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-video"
                >
                  <FiYoutube /> Ver video
                </a>
                {onSelectExercise && (
                  <button 
                    className="btn-select"
                    onClick={() => onSelectExercise(exercise.name)}
                  >
                    Seleccionar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles del ejercicio */}
      {selectedExercise && (
        <div className="exercise-modal-overlay">
          <div className="exercise-modal">
            <button 
              className="close-modal"
              onClick={() => setSelectedExercise(null)}
              aria-label="Cerrar"
            >
              <FiX />
            </button>
            <h2>{selectedExercise.name}</h2>
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedExercise.image} alt={selectedExercise.name} />
              </div>
              <div className="modal-details">
                <h3>Instrucciones:</h3>
                <ol>
                  {selectedExercise.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                <a 
                  href={selectedExercise.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-video"
                >
                  <FiYoutube /> Ver video tutorial
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routines;
