import { useContext, useEffect } from 'react';
import styles from './AppointmentsList.module.scss';
import { useTranslation } from 'react-i18next';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';
import AppointmentCard from '@/components/AppointmentCard';
import PropTypes from 'prop-types';
import { ProfileContext } from '@/contexts/ProfileContext';

const AppointmentsList = ({
  isFutureAppointments = false,
}) => {
  const { t } = useTranslation('profile');
  const { profile } = useContext(ProfileContext);
  const {
    myAppointments,
    isMyAppointmentsLoading,
    getAppointments,
  } = useContext(AppointmentContext);

  useEffect(() => {
    if (isFutureAppointments) {
      getAppointments({
        'startDate[after]': new Date().toISOString(),
        'client.id': profile.id,
      });
    } else {
      getAppointments({
        'startDate[before]': new Date().toISOString(),
        'client.id': profile.id,
      });
    }
  }, []);

  return (
    <div
      className={styles.Appointments}
    >
      <h2>{t( isFutureAppointments ? 'futureAppointments.title' : 'pastAppointments.title')}</h2>
      <div
        className={styles.AppointmentsList}
      >
        {isMyAppointmentsLoading && <div>{t('loading', { ns: 'base' })}...</div>}
        {(!isMyAppointmentsLoading && myAppointments.length === 0) && !isMyAppointmentsLoading && <div>{t(isFutureAppointments ? 'futureAppointments.noAppointments' : 'pastAppointments.noAppointments')}</div>}
        {!isMyAppointmentsLoading && myAppointments.map((appointment) =>
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            showEstablishment={true}
          />)}
      </div>
    </div>
  );
};

export default AppointmentsList;

AppointmentsList.propTypes = {
  isFutureAppointments: PropTypes.bool,
};
