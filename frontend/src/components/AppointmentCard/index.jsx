import PropTypes from 'prop-types';
import styles from './AppointmentCard.module.scss';
import { dateTimeFull } from '@/utils/formater/date';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
import { BanknotesIcon, CalendarIcon, ClockIcon, SparklesIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import ModalSendReview  from '@/components/ModalSendReview';

function AppointmentCard({
  appointment,
  feedbackTypes,
}) {
  const { t } = useTranslation('appointmentCard');
  const { i18n } = useTranslation();

  const isPast = new Date(appointment.endDate) < new Date();

  const [ modalIsOpen, setIsModalOpen ] = useState(false);

  const openReviewModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className={styles.AppointmentCard}>
      <p className={styles.AppointmentCardDate}>
        {dateTimeFull(appointment.startDate, i18n.resolvedLanguage)}
      </p>
      <p className={styles.AppointmentCardName}>
        <SparklesIcon />
        {appointment.service.name.length > 30 ? `${appointment.service.name.substring(0, 30)}...` : appointment.service.name}
      </p>
      <div className={styles.AppointmentCardDetails}>
        <span className={styles.AppointmentCardDetailsText}>
          <ClockIcon />
          {appointment.service.duration} min
        </span>
        <span className={styles.AppointmentCardDetailsText}>
          <BanknotesIcon />
          {appointment.service.price} €
        </span>
        <span className={styles.AppointmentCardDetailsText}>
          <CalendarIcon />{t('with')} {appointment.employee.firstname}
        </span>
      </div>
      {isPast && !appointment.feedback &&
        <>
          <Button
            variant="black"
            onClick={openReviewModal}
          >
            {t('leaveComment')}
          </Button>
        </>
      }
      <ModalSendReview
        feedbackTypes={feedbackTypes}
        appointment={appointment}
        modalIsOpen={modalIsOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    feedback: PropTypes.shape({
      id: PropTypes.number,
    }),
    service: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
      duration: PropTypes.number,
    }),
    employee: PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
    }),
  }),
  feedbackTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
};

export default AppointmentCard;
