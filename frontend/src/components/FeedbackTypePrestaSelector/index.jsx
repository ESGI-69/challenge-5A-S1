import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { useContext, useEffect } from 'react';
import { FeedbackTypeContext } from '@/contexts/api/FeedbackTypeContext';
import { useTranslation } from 'react-i18next';
import Button from '../lib/Button';
import styles from './FeedbackTypePrestaSelector.module.scss';

export default function FeedbackTypePrestaSelector() {
  const { establishment, isEstablishmentLoading, patch, refetchEstablishment, isPatchEstablishmentLoading } = useContext(EstablishmentContext);
  const { getAllFeedbackTypes, isGetAllFeedbackTypesLoading, feedbackTypes } = useContext(FeedbackTypeContext);

  const { t } = useTranslation('feedbackTypePrestaSelector');

  useEffect(() => {
    getAllFeedbackTypes();
  }, []);

  const onDeleteFeebackType = async (feedbackTypeId) => {
    await patch(establishment.id, {
      feedbackTypes: establishment.feedbackTypes.filter((feedbackType) => feedbackType.id !== feedbackTypeId).map((feedbackType) => `/api/feedback_types/${feedbackType.id}`),
    });
    refetchEstablishment();
  };

  const onAddFeedbackType = async (feedbackTypeId) => {
    await patch(establishment.id, {
      feedbackTypes: [ ...establishment.feedbackTypes.map((feedbackType) => `/api/feedback_types/${feedbackType.id}`), `/api/feedback_types/${feedbackTypeId}` ],
    });
    refetchEstablishment();
  };

  if (isEstablishmentLoading || isGetAllFeedbackTypesLoading) {
    return <div>Loading...</div>; // or any loading spinner component you have
  }

  return (
    <div className={styles.FeedbackTypePrestaSelector}>
      <h3>{t('deleteTitle')}</h3>
      {establishment?.feedbackTypes.map((feedbackType) => (
        <div key={feedbackType.id} className={styles.FeedbackTypePrestaSelectorTab}>
          <label className={styles.FeedbackTypePrestaSelectorTabLabel} htmlFor={feedbackType.id}>{feedbackType.name}</label>
          <Button
            variant="danger"
            onClick={() => onDeleteFeebackType(feedbackType.id)}
            disabled={isPatchEstablishmentLoading}
          >
            {t('delete')}
          </Button>
        </div>
      ))}
      <h3>{t('addTitle')}</h3>
      {feedbackTypes.filter(feedbackType => establishment.feedbackTypes && !establishment.feedbackTypes.map(ft => ft.id).includes(feedbackType.id)).map((feedbackType) => (
        <div key={feedbackType.id} className={styles.FeedbackTypePrestaSelectorTab}>
          <label className={styles.FeedbackTypePrestaSelectorTabLabel} htmlFor={feedbackType.id}>{feedbackType.name}</label>
          <Button
            variant="primary"
            onClick={() => onAddFeedbackType(feedbackType.id)}
            disabled={isPatchEstablishmentLoading}
          >
            {t('add')}
          </Button>
        </div>
      ))}
    </div>
  );
}
