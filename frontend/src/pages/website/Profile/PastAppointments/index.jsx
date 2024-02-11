import { useContext, useEffect } from 'react';
import styles from './PastAppointments.module.scss';
import { useTranslation } from 'react-i18next';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';

const PastAppointments = () => {
  const { t } = useTranslation('profile');
  const {
    myAppointments,
    isMyAppointmentsLoading,
    getMyAppointments,
  } = useContext(AppointmentContext);

  useEffect(() => {
    getMyAppointments();
  }, []);

  return (
    <div
      className={styles.Appointments}
    >
      <h2>{t('pastAppointments.title')}</h2>
      <div
        className={styles.AppointmentsList}
      >
        {isMyAppointmentsLoading && <div>{t('loading', { ns: 'base' })}...</div>}
        {myAppointments.length === 0 && !isMyAppointmentsLoading && <div>{t('pastAppointments.noAppointments')}</div>}
        {myAppointments.map((appointment) => (
          <div key={appointment.id}>
            <p>
              {appointment.establishment.name}
            </p>
            <p>
              {appointment.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastAppointments;
