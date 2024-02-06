import PropTypes from 'prop-types';
import styles from './AppointmentCard.module.scss';
import { dateTimeFull } from '@/utils/formater/date';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
import { BanknotesIcon, CalendarIcon, ClockIcon, SparklesIcon } from '@heroicons/react/20/solid';
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
            <h1>{t('modal.title')}</h1>
            <p>{t('modal.subText')} {dateTimeFull(appointment.startDate, i18n.resolvedLanguage)}.</p>
            <div className={styles.AppointmentCardModalRating}>
              {feedbackTypes?.map(feedbackType => (
                <div key={feedbackType.id}>
                  {feedbackType.name}
                </div>
              ))}
            </div>
            <div className={styles.AppointmentCardModalForm}>
              <label htmlFor="">{t('modal.label')}</label>
              <textarea
                name="comment"
                id="comment"
                placeholder={t('modal.placeholder')}
                className={styles.AppointmentCardModalFormTextarea}
              >
              </textarea>
            </div>
            <div className={styles.AppointmentCardModalBtns}>
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
            </div>
          </Modal>
        </>
      }
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
