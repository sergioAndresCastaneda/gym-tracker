import React, { useState, useEffect } from 'react';
import routines from '../data/routines';

function ExerciseModal({ open, onClose, onSave, date, initialExercise = '' }) {
  const [exercise, setExercise] = useState(initialExercise);
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
  const [weight, setWeight] = useState(0);
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filtrar rutinas basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRoutines(routines);
    } else {
      const filtered = routines.filter(routine => 
        routine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        routine.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRoutines(filtered);
    }
  }, [searchTerm]);

  // Inicializar con todas las rutinas
  useEffect(() => {
    setFilteredRoutines(routines);
  }, []);

  // Manejar selección de ejercicio
  const handleSelectExercise = (selectedExercise) => {
    setExercise(selectedExercise);
    setIsDropdownOpen(false);
  };

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise) return;
    onSave({ exercise, sets, reps, weight });
    setExercise('');
    setSets(1);
    setReps(1);
    setWeight(0);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal redesigned-modal">
        <div className="modal-header">
          <span className="modal-icon">💪</span>
          <h2>Registrar ejercicio</h2>
          <span className="modal-date">{date && date.toLocaleDateString()}</span>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label htmlFor="exercise"><span role="img" aria-label="Ejercicio">🏋️‍♂️</span> Ejercicio</label>
            <input
              id="exercise"
              value={exercise}
              onChange={e => setExercise(e.target.value)}
              required
              placeholder="Ej: Press banca, Sentadilla, Peso muerto..."
              autoFocus
            />
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="sets"><span role="img" aria-label="Series">🔢</span> Series</label>
              <input
                id="sets"
                type="number"
                value={sets}
                min="1"
                onChange={e => setSets(Number(e.target.value))}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="reps"><span role="img" aria-label="Repeticiones">🔁</span> Repeticiones</label>
              <input
                id="reps"
                type="number"
                value={reps}
                min="1"
                onChange={e => setReps(Number(e.target.value))}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="weight"><span role="img" aria-label="Peso">🏋️</span> Peso (kg)</label>
              <input
                id="weight"
                type="number"
                value={weight}
                min="0"
                onChange={e => setWeight(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-primary">Guardar</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
      <style>{`
        .modal-backdrop {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(40, 40, 60, 0.25); display: flex; align-items: center; justify-content: center;
          z-index: 1000;
        }
        .redesigned-modal {
          background: #f8fafc;
          padding: 2.5rem 2rem 2rem 2rem;
          border-radius: 18px;
          box-shadow: 0 4px 32px #0003;
          min-width: 350px;
          max-width: 95vw;
          width: 420px;
        }
        .modal-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          justify-content: space-between;
        }
        .modal-icon {
          font-size: 2.2rem;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.7rem;
          font-weight: 800;
          color: #3b3b6d;
        }
        .modal-date {
          color: #6a82fb;
          font-weight: bold;
          font-size: 1.1rem;
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .input-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .input-group {
          flex: 1 1 120px;
          min-width: 120px;
          max-width: 180px;
          display: flex;
          flex-direction: column;
          margin-bottom: 1.5rem;
          position: relative;
        }
        @media (max-width: 700px) {
          .input-row {
            flex-direction: column;
            gap: 0.7rem;
          }
          .redesigned-modal {
            width: 98vw;
            min-width: unset;
            padding: 1.5rem 0.5rem;
          }
        }
        .input-group label {
          font-weight: 600;
          color: #6a82fb;
          margin-bottom: 0.2rem;
          font-size: 1.02rem;
        }
        .input-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 1rem;
          margin-top: 0.5rem;
          background: var(--card-bg);
          color: var(--text-primary);
        }
        .exercise-select {
          position: relative;
          width: 100%;
          margin-top: 0.5rem;
        }
        .exercise-select__control {
          display: flex;
          align-items: center;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0;
          cursor: pointer;
          position: relative;
        }
        .exercise-select__input {
          flex: 1;
          padding: 0.75rem;
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-size: 1rem;
          cursor: pointer;
          margin: 0;
          outline: none;
        }
        .exercise-select__arrow {
          padding: 0 1rem;
          color: var(--text-secondary);
          font-size: 0.75rem;
        }
        .exercise-select__dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          max-height: 300px;
          overflow-y: auto;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          margin-top: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
        }
        .exercise-select__list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .exercise-select__item {
          padding: 0.75rem 1rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid var(--border);
          transition: background-color 0.2s;
        }
        .exercise-select__item:last-child {
          border-bottom: none;
        }
        .exercise-select__item:hover {
          background-color: var(--accent-blue);
          color: white;
        }
        .exercise-select__name {
          font-weight: 500;
        }
        .exercise-select__category {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }
        .exercise-select__item:hover .exercise-select__category {
          color: rgba(255, 255, 255, 0.8);
        }
        .exercise-select__no-results {
          padding: 1rem;
          text-align: center;
          color: var(--text-secondary);
          font-style: italic;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1.2rem;
        }
        .btn-primary {
          background: linear-gradient(90deg, #6a82fb, #fc5c7d);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.7rem 1.7rem;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 2px 8px #6a82fb22;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          background: linear-gradient(90deg, #fc5c7d, #6a82fb);
          box-shadow: 0 4px 16px #fc5c7d33;
        }
        .btn-secondary {
          background: #fff;
          color: #6a82fb;
          border: 1.5px solid #6a82fb;
          border-radius: 8px;
          padding: 0.7rem 1.5rem;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .btn-secondary:hover {
          background: #f1f5ff;
          color: #fc5c7d;
          border-color: #fc5c7d;
        }
      `}</style>
    </div>
  );
}

export default ExerciseModal;
