import PropTypes from 'prop-types';
import styles from './AppointmentCard.module.scss';
import { dateTimeFull } from '@/utils/formater/date';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
import { BanknotesIcon, CalendarIcon, ClockIcon } from '@heroicons/react/20/solid';
import Modal from 'react-modal';
import { useState } from 'react';

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
      <h4 className={styles.AppointmentCardDate}>
        {dateTimeFull(appointment.startDate, i18n.resolvedLanguage)}
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
      {isPast && !appointment.feedback &&
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
        <h4>{t('modal.title')}</h4>
        <p>{t('modal.subText')}</p>
        <div className={styles.AppointmentCardModalRating}>
          {feedbackTypes?.map(feedbackType => (
            <div key={feedbackType.id}>
              {feedbackType.name}
            </div>
          ))}
        </div>
        <textarea
          name=""
          id=""
          placeholder={t('modal.placeholder')}
        >
        </textarea>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(false)}
        >
          {t('modal.confirm')}
        </Button>
        <Button
          variant="danger"
          onClick={() => setIsModalOpen(false)}
        >
          {t('modal.cancel')}
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
    feedback: PropTypes.shape({
      id: PropTypes.number,
    }),
    service: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      duration: PropTypes.number,
    }),
    employee: PropTypes.shape({
      firstname: PropTypes.string,
    }),
  }),
  feedbackTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  hasFeedback: PropTypes.bool,
};

export default AppointmentCard;
