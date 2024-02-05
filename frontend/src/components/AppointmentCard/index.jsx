import PropTypes from 'prop-types';
import styles from './AppointmentCard.module.scss';
import { dateTimeFull } from '@/utils/formater/date';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
import { BanknotesIcon, CalendarIcon, ClockIcon } from '@heroicons/react/20/solid';
import Modal from 'react-modal';
import { useContext, useEffect, useState } from 'react';

function AppointmentCard({
  appointment,
}) {
  const { t } = useTranslation('appointmentCard');

  const isPast = new Date(appointment.endDate) < new Date();

  const [ modalIsOpen, setIsModalOpen ] = useState(false);

  const openReviewModal = () => {
    setIsModalOpen(true);
  };

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
       <Button
         variant="black"
         onClick={openReviewModal}
       >
         {t('leaveComment')}
       </Button>
      }
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        className={styles.AppointmentCardModal}
        style={{
          overlay: {
            zIndex: 1000,
          },
        }}
      >
        <p>Test</p>
        <Button
          variant="black"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>
      </Modal>
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
