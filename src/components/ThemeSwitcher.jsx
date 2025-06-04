import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    document.body.classList.toggle('light-theme', !prefersDark);
    
    // Guardar preferencia en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.body.classList.toggle('light-theme', savedTheme === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.body.classList.toggle('light-theme', !newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <button 
      className="theme-switch"
      onClick={toggleTheme}
      aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
    >
      {isDark ? (
        <FiSun style={{ color: '#ffd700' }} />
      ) : (
        <FiMoon style={{ color: '#2d3748' }} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
