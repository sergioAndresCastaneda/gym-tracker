import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { addDays, startOfDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ExerciseModal from './ExerciseModal';
import EventWithTooltip from './EventWithTooltip';
import moment from 'moment';

const localizer = momentLocalizer(moment);

function CalendarView({ records, addRecord, selectedExercise = '' }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialExercise, setInitialExercise] = useState('');

  // Si hay un ejercicio seleccionado desde la sección de Rutinas, abrir el modal automáticamente
  React.useEffect(() => {
    if (selectedExercise) {
      setInitialExercise(selectedExercise);
      setSelectedDate(new Date());
      setModalOpen(true);
    }
  }, [selectedExercise]);

  const events = records.map((r, idx) => ({
    id: idx,
    title: r.exercise + ` (${r.sets}x${r.reps})`,
    start: startOfDay(new Date(r.date)),
    end: addDays(startOfDay(new Date(r.date)), 1),
    allDay: true,
    ...r,
  }));

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setModalOpen(true);
  };

  const handleAdd = (data) => {
    addRecord({ ...data, date: selectedDate });
    setModalOpen(false);
  };

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
        views={['month']}
        popup
        components={{ event: EventWithTooltip }}
      />
      <ExerciseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAdd}
        date={selectedDate}
      />
    </div>
  );
}

export default CalendarView;
