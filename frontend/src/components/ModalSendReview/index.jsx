import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { StarIcon } from '@heroicons/react/20/solid';
import Button from '@/components/lib/Button';
import { dateTimeFull } from '@/utils/formater/date';
import styles from './ModalSendReview.module.scss';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { FeedbackContext } from '@/contexts/api/FeedbackContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { AppointmentContext } from '@/contexts/api/AppointmentContext';

function ModalSendReview({
  appointment,
  feedbackTypes,
  modalIsOpen,
  setIsModalOpen,
  isEstablishmentPage,
}){
  const { i18n } = useTranslation();
  const { t } = useTranslation('modalSendReview');
  const [ ratings, setRatings ] = useState({});
  const [ comment, setComment ] = useState('');
  const { postFeedback, isPostFeedbackLoading } = useContext(FeedbackContext);
  const { refetchEstablishment } = useContext(EstablishmentContext);
  const { refetchAppointments } = useContext(AppointmentContext);

  const ratingTexts = {
    1: t('notation.1'),
    2: t('notation.2'),
    3: t('notation.3'),
    4: t('notation.4'),
    5: t('notation.5'),
  };

  const handleRating = (feedbackTypeId, rating) => {
    setRatings(prevRatings => ({ ...prevRatings, [feedbackTypeId]: rating }));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSendingReview = async (e) => {
    e.preventDefault();
    const allFeedbackTypesHaveRating = feedbackTypes.every(feedbackType => ratings[feedbackType.id]);
    const commentIsNotEmpty = comment.trim() !== '';
    const ratingsValues = Object.values(ratings);
    const averageRating = ratingsValues.length > 0 ? ratingsValues.reduce((acc, rating) => acc + rating, 0) / feedbackTypes.length : null;
    if (allFeedbackTypesHaveRating && commentIsNotEmpty) {
      const data = {
        comment,
        employee: `/api/employees/${appointment.employee.id}`,
        appointment: `/api/appointments/${appointment.id}`,
        service: `/api/services/${appointment.service.id}`,
        subFeedback: [
          ...feedbackTypes.map(feedbackType => ({
            feedbackType: `/api/feedback_types/${feedbackType.id}`,
            note: ratings[feedbackType.id],
          })),
        ],
      };
      if (averageRating !== null) {
        data.averageRating = averageRating;
      }
      await postFeedback(data);
      if (isEstablishmentPage) {
        refetchEstablishment();
      } else {
        refetchAppointments();
      }
      toast.success(t('successForm'));
      setIsModalOpen(false);

    } else {
      toast.error(t('errorForm'));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      className={styles.Modal}
      style={{
        overlay: {
          zIndex: 1000,
        },
      }}
    >
      <h1>{t('title')}</h1>
      <p className={styles.ModalSubtext}>
        {t('subText')} {dateTimeFull(appointment.startDate, i18n.resolvedLanguage)}.
      </p>
      <form onSubmit={handleSendingReview} className={styles.ModalForm}>
        <div className={styles.ModalRatings}>
          {feedbackTypes?.map(feedbackType => (
            <div key={feedbackType.id} className={styles.ModalRating}>
              <span className={styles.ModalRatingName}>
                {feedbackType.name}
              </span>
              <div className={styles.ModalRatingStars}>
                {[ ...Array(5) ].map((_, i) => (
                  <div
                    key={i}
                    onClick={() => handleRating(feedbackType.id, i + 1)}
                    aria-label={`Rate ${i + 1}`}
                    className={styles.ModalRatingStarsStar}
                  >
                    {(ratings[feedbackType.id] || 0) > i ? <StarIcon /> : <StarIcon className={styles.ModalRatingStarsStarInactive} />}
                  </div>
                ))}
              </div>
              <p className={styles.ModalRatingText}>
                {ratingTexts[ratings[feedbackType.id]]}
              </p>
            </div>
          ))}
        </div>
        <label htmlFor="">{t('label')}</label>
        <textarea
          name="comment"
          id="comment"
          placeholder={t('placeholder')}
          className={styles.ModalFormTextarea}
          value={comment}
          onChange={handleCommentChange}
        >
        </textarea>
        <div className={styles.ModalBtns}>
          <Button
            variant="primary"
            onClick={handleSendingReview}
            disabled={isPostFeedbackLoading}
          >
            {t('confirm')}
          </Button>
          <Button
            variant="danger"
            onClick={handleCloseModal}
          >
            {t('cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

ModalSendReview.propTypes = {
  isEstablishmentPage: PropTypes.bool,
  modalIsOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
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

export default ModalSendReview;
