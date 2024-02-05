import PropTypes from 'prop-types';
import styles from './AppointmentCard.module.scss';
import { dateTimeFull } from '@/utils/formater/date';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
import { BanknotesIcon, CalendarIcon, ClockIcon } from '@heroicons/react/20/solid';

function AppointmentCard({
  appointment,
}) {
  const { t } = useTranslation('appointmentCard');

  const isPast = new Date(appointment.endDate) < new Date();

  return (
    <div className={styles.AppointmentCard}>
      <h4 className={styles.AppointmentCardDate}>
        {dateTimeFull(appointment.startDate)}
      </h4>
      <p className={styles.AppointmentCardName}>
        {appointment.service.name}
      </p>
      <div className={styles.AppointmentCardDetails}>
        <span className={styles.AppointmentCardDetailsText}>
          <ClockIcon />{appointment.service.duration} min
        </span>
        <span className={styles.AppointmentCardDetailsText}>
          <BanknotesIcon />{appointment.service.price} €
        </span>
        <span className={styles.AppointmentCardDetailsText}>
          <CalendarIcon />{t('with')} {appointment.employee.firstname}
        </span>
      </div>
      {isPast &&
       <Button variant="black">
         {t('leaveComment')}
       </Button>
      }
    </div>
  );
}

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    service: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      duration: PropTypes.number,
    }),
    employee: PropTypes.shape({
      firstname: PropTypes.string,
    }),
  }),
};

export default AppointmentCard;
