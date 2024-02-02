import PropTypes from 'prop-types';
import styles from './AppointmentCard.module.scss';
import { dateTime } from '@/utils/formater/date';

function AppointmentCard({
  appointment,
}) {
  return (
    <div className={styles.AppointmentCard}>
      <p className={styles.AppointmentCardRow}>
        {dateTime(appointment.startDate)}
      </p>
      <p className={styles.AppointmentCardRow}>
        {appointment.service.name}
      </p>
      <div className={styles.AppointmentCardDetails}>
        <span>{appointment.service.price} €</span>
        <span>{appointment.service.name}</span>
        <span>{appointment.employee.firstname}</span>
      </div>
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
    }),
    employee: PropTypes.shape({
      firstname: PropTypes.string,
    }),
  }),
};

export default AppointmentCard;
