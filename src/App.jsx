import React, { useState, useEffect } from 'react';
import { FiCalendar, FiBarChart2, FiActivity } from 'react-icons/fi';
import CalendarView from './components/CalendarView';
import Dashboard from './components/Dashboard';
import Routines from './components/Routines';
import ThemeSwitcher from './components/ThemeSwitcher';
import ParticlesBackground from './components/ParticlesBackground';
import './App.css';

function App() {
  const [view, setView] = useState('calendar');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [records, setRecords] = useState(() => {
    const saved = window.localStorage.getItem('gymRecords');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Rutina base de masa muscular para el primer mes
  const defaultRoutine = [
    // Día 1: Pecho y Tríceps
    { date: getNextWeekdayDate(1), exercise: 'Press de banca con barra', sets: 4, reps: 8, weight: 0 },
    { date: getNextWeekdayDate(1), exercise: 'Press inclinado con mancuernas', sets: 3, reps: 10, weight: 0 },
    { date: getNextWeekdayDate(1), exercise: 'Fondos de tríceps', sets: 3, reps: 10, weight: 0 },
    { date: getNextWeekdayDate(1), exercise: 'Aperturas con mancuernas', sets: 2, reps: 12, weight: 0 },
    { date: getNextWeekdayDate(1), exercise: 'Extensión de tríceps en polea', sets: 3, reps: 12, weight: 0 },
    // Día 2: Espalda y Bíceps
    { date: getNextWeekdayDate(2), exercise: 'Dominadas', sets: 4, reps: 8, weight: 0 },
    { date: getNextWeekdayDate(2), exercise: 'Remo con barra', sets: 3, reps: 10, weight: 0 },
    { date: getNextWeekdayDate(2), exercise: 'Remo en máquina', sets: 2, reps: 12, weight: 0 },
    { date: getNextWeekdayDate(2), exercise: 'Curl de bíceps con barra', sets: 3, reps: 10, weight: 0 },
    { date: getNextWeekdayDate(2), exercise: 'Curl martillo', sets: 2, reps: 12, weight: 0 },
    // Día 3: Piernas y Abdomen
    { date: getNextWeekdayDate(4), exercise: 'Sentadilla', sets: 4, reps: 8, weight: 0 },
    { date: getNextWeekdayDate(4), exercise: 'Prensa de piernas', sets: 3, reps: 10, weight: 0 },
    { date: getNextWeekdayDate(4), exercise: 'Curl femoral tumbado', sets: 3, reps: 12, weight: 0 },
    { date: getNextWeekdayDate(4), exercise: 'Elevación de talones', sets: 4, reps: 15, weight: 0 },
    { date: getNextWeekdayDate(4), exercise: 'Crunch abdominal', sets: 3, reps: 15, weight: 0 },
    // Día 4: Hombros y Full body
    { date: getNextWeekdayDate(5), exercise: 'Press militar', sets: 4, reps: 8, weight: 0 },
    { date: getNextWeekdayDate(5), exercise: 'Elevaciones laterales', sets: 3, reps: 12, weight: 0 },
    { date: getNextWeekdayDate(5), exercise: 'Face pulls', sets: 3, reps: 15, weight: 0 },
    { date: getNextWeekdayDate(5), exercise: 'Peso muerto rumano', sets: 3, reps: 10, weight: 0 },
    { date: getNextWeekdayDate(5), exercise: 'Plancha abdominal', sets: 3, reps: 1, weight: 0 },
  ];

  const addRecord = (record) => {
    setRecords(prev => {
      const updated = [...prev, record];
      localStorage.setItem('gymRecords', JSON.stringify(updated));
      return updated;
    });
  };

  // Guardar en localStorage cuando cambian los records
  useEffect(() => {
    localStorage.setItem('gymRecords', JSON.stringify(records));
  }, [records]);

  // Función para calcular la próxima fecha de cada día de la semana
  function getNextWeekdayDate(weekday) {
    // 0=domingo, 1=lunes, ... 6=sábado
    const today = new Date();
    const result = new Date(today);
    result.setDate(today.getDate() + ((7 + weekday - today.getDay()) % 7));
    return result.toISOString().split('T')[0];
  }

  // Función para manejar la selección de un ejercicio desde la lista de rutinas
  const handleExerciseSelect = (exerciseName) => {
    setSelectedExercise(exerciseName);
    setView('calendar');
  };

  return (
    <div className="app-container">
      <ParticlesBackground count={30} />
      <header>
        <div className="header-content">
          <h1>Gym Activity Tracker</h1>
          <p className="header-subtitle">Seguimiento de entrenamiento personal</p>
        </div>
        <nav>
          <button 
            onClick={() => setView('calendar')} 
            className={view === 'calendar' ? 'active' : ''}
          >
            <FiCalendar style={{ marginRight: '8px' }} />
            Calendario
          </button>
          <button 
            onClick={() => setView('routines')}
            className={view === 'routines' ? 'active' : ''}
          >
            <FiActivity style={{ marginRight: '8px' }} />
            Rutinas
          </button>
          <button 
            onClick={() => setView('dashboard')}
            className={view === 'dashboard' ? 'active' : ''}
          >
            <FiBarChart2 style={{ marginRight: '8px' }} />
            Dashboard
          </button>
        </nav>
      </header>
      <main>
        {view === 'calendar' ? (
          <div className="fade-in">
            <CalendarView 
              records={records} 
              onAddRecord={addRecord} 
              selectedExercise={selectedExercise}
            />
          </div>
        ) : view === 'routines' ? (
          <div className="fade-in">
            <Routines onSelectExercise={handleExerciseSelect} />
          </div>
        ) : (
          <div className="fade-in">
            <Dashboard records={records} />
          </div>
        )}
      </main>
      <ThemeSwitcher />
    </div>
  );
}

export default App;
