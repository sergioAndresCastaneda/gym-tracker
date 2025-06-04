import React from 'react';

function getIconForExercise(name) {
  // Puedes personalizar iconos según el tipo de ejercicio
  const n = name.toLowerCase();
  if (n.includes('banca') || n.includes('press')) return '🏋️';
  if (n.includes('sentadilla')) return '🦵';
  if (n.includes('remo')) return '🚣';
  if (n.includes('dominada')) return '🤸';
  if (n.includes('peso muerto')) return '🏋️‍♂️';
  if (n.includes('curl')) return '💪';
  if (n.includes('fondos')) return '↕️';
  if (n.includes('prensa')) return '🦵';
  if (n.includes('face pull')) return '🧑‍🎤';
  if (n.includes('plancha')) return '🧘';
  if (n.includes('crunch')) return '🧘';
  return '🏋️';
}

const tooltipStyle = {
  position: 'absolute',
  zIndex: 99,
  background: 'var(--bg-tertiary)',
  color: 'var(--text-primary)',
  borderRadius: 12,
  boxShadow: '0 4px 20px var(--shadow)',
  padding: '1rem',
  fontSize: '0.95rem',
  pointerEvents: 'none',
  minWidth: 200,
  maxWidth: 300,
  left: 0,
  top: 30,
  border: '1px solid var(--border)',
  backdropFilter: 'blur(4px)'
};

export default function EventWithTooltip({ event }) {
  const [show, setShow] = React.useState(false);

  return (
    <span
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: 8, 
        position: 'relative', 
        cursor: 'pointer',
        padding: '4px 8px',
        borderRadius: 6,
        transition: 'background 0.2s ease'
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span style={{ 
        fontSize: '1.2em',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
      }}>
        {getIconForExercise(event.exercise || event.title)}
      </span>
      <span style={{ 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        maxWidth: 120,
        color: 'var(--text-primary)',
        fontWeight: 500
      }}>
        {event.title}
      </span>
      {show && (
        <span style={tooltipStyle}>
          <strong style={{ 
            color: 'var(--accent-green)',
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '1.1em'
          }}>
            {event.exercise || event.title}
          </strong>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Series:</span>
            <b style={{ color: 'var(--accent-blue)' }}>{event.sets}</b>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Repeticiones:</span>
            <b style={{ color: 'var(--accent-blue)' }}>{event.reps}</b>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Peso:</span>
            <b style={{ color: 'var(--accent-orange)' }}>{event.weight} kg</b>
          </span>
        </span>
      )}
    </span>
  );
}
