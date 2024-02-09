import BackofficeHeader from '@/components/BackofficeHeader';
import { useTranslation } from 'react-i18next';
import FeedbackTypeSelector from '@/components/FeedbackTypeSelector';
import FeedbackTypeProvider from '@/contexts/api/FeedbackTypeContext';

export default function FeedbackType() {
  const { t } = useTranslation('feedbackType');

  return (
    <>
      <BackofficeHeader>
        <h1>{t('title')}</h1>
      </BackofficeHeader>
      <FeedbackTypeProvider>
        <h2>{t('feedbackTypeSelector')}</h2>
        <FeedbackTypeSelector />
      </FeedbackTypeProvider>
    </>
  );
}
