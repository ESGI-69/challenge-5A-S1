import PropTypes from 'prop-types';
import styles from './AppointmentCard.module.scss';
import { dateTimeFull } from '@/utils/formater/date';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
import { BanknotesIcon, CalendarIcon, ClockIcon, MapPinIcon, SparklesIcon  } from '@heroicons/react/20/solid';
import { useState } from 'react';
import ModalSendReview  from '@/components/ModalSendReview';
import { Link } from 'react-router-dom';
import FeedbackProvider from '@/contexts/api/FeedbackContext';

function AppointmentCard({
  appointment,
  showEstablishment = false,
  isEstablishmentPage = false,
}) {
  const { t } = useTranslation('appointmentCard');
  const { i18n } = useTranslation();

  const isPast = new Date(appointment.endDate) < new Date();

  const [ modalIsOpen, setIsModalOpen ] = useState(false);

  const openReviewModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={`${styles.AppointmentCard} ${showEstablishment && styles.AppointmentCard_ShowEstablishment}`}>
      {showEstablishment &&
        <img className={styles.AppointmentCardImage} src={appointment.establishment.establishmentPictures[0]?.pathPicture ? `${import.meta.env.VITE_API_DOMAIN}${appointment.establishment.establishmentPictures[0]?.pathPicture}` : 'https://placehold.co/600x400'} />
      }
      <div className={styles.AppointmentCardInfo}>
        <p className={styles.AppointmentCardDate}>
          {dateTimeFull(appointment.startDate, i18n.resolvedLanguage)}
        </p>
        {showEstablishment &&
        <Link
          to={`/establishment/${appointment.establishment.id}`}
          className={styles.AppointmentCardCompanyName}
        >
          {appointment.establishment.company.name}
        </Link>
        }
        {showEstablishment &&
        <p className={styles.AppointmentCardAddress}>
          <MapPinIcon />
          {appointment.establishment.street}, {appointment.establishment.zipCode} {appointment.establishment.city}
        </p>
        }
        <p className={styles.AppointmentCardName}>
          <SparklesIcon />
          {appointment.service.name.length > 30 ? `${appointment.service.name.substring(0, 30)}...` : appointment.service.name}
        </p>
        <div className={styles.AppointmentCardDetails}>
          <span className={styles.AppointmentCardDetailsText}>
            <ClockIcon />
            {appointment.service.duration} {t('minutes', { ns: 'base' })}
          </span>
          <span className={styles.AppointmentCardDetailsText}>
            <BanknotesIcon />
            {appointment.service.price} €
          </span>
          <span className={styles.AppointmentCardDetailsText}>
            <CalendarIcon />{t('with')} {appointment.employee.firstname} {(appointment.employee.avatar && showEstablishment) && <img className={styles.AppointmentCardDetailsTextImage} src={`${import.meta.env.VITE_API_DOMAIN}${appointment.employee.avatar}`} alt="employee-picture" />}
          </span>
        </div>
        <div className={styles.AppointmentCardInfoBtns}>
          <Link
            to={`/reservation/${appointment.service.id}/${appointment.employee.id}`}
          >
            <Button
              variant="black"
            >
              {t('retakeAppointment')}
            </Button>
          </Link>
          {isPast &&
          <Button
            disabled={appointment.feedback}
            variant="black"
            onClick={openReviewModal}
          >
            {t('leaveComment')}
          </Button>
          }
        </div>
        <FeedbackProvider>
          <ModalSendReview
            feedbackTypes={appointment.establishment.feedbackTypes}
            appointment={appointment}
            modalIsOpen={modalIsOpen}
            setIsModalOpen={setIsModalOpen}
            isEstablishmentPage={isEstablishmentPage}
          />
        </FeedbackProvider>
      </div>
    </div>
  );
}

AppointmentCard.propTypes = {
  isEstablishmentPage: PropTypes.bool,
  appointment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    feedback: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    service: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    }).isRequired,
    employee: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
    establishment: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
      establishmentPictures: PropTypes.arrayOf(PropTypes.shape({
        pathPicture: PropTypes.string.isRequired,
      })),
      feedbackTypes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })),
      company: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  showEstablishment: PropTypes.bool,
};

export default AppointmentCard;
