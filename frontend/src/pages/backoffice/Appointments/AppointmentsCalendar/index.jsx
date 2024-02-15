import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';
import PropTypes from 'prop-types';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function AppointmentsCalendar({ establishmentId }) {
  const {
    getEstablishmentAppointments,
    establishmentAppointments,
  } = useContext(AppointmentContext);
  const [ events, setEvents ] = useState([]);
  useEffect(() => {
    if (establishmentId) {
      getEstablishmentAppointments(establishmentId);
    }
  }, [ establishmentId ]);
  useEffect(() => {
    const evs = establishmentAppointments.map((appointment) => ({
      title: `[${appointment.employee.firstname}] ${appointment.service.name} avec ${appointment.client.firstname}`,
      start: new Date(appointment.startDate),
      end: new Date(appointment.endDate),
      allDay: false,
    }));
    setEvents(evs);
  }, [ establishmentAppointments ]);

  return (
    <section className={styles.Calendar}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
      />
    </section>
  );
}

AppointmentsCalendar.propTypes = {
  establishmentId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
};

