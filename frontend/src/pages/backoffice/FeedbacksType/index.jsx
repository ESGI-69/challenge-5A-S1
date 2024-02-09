import BackofficeHeader from '@/components/BackofficeHeader';
import { useTranslation } from 'react-i18next';
import FeedbackTypeSelector from '@/components/FeedbackTypeSelector';

export default function CompaniesValidation() {
  const { t } = useTranslation('feedbackType');

  return (
    <>
      <BackofficeHeader>
        <h1>{t('title')}</h1>
      </BackofficeHeader>
      {/* provider */}
      <h2>{t('feedbackTypeSelector')}</h2>
      <FeedbackTypeSelector
        feedbackTypes={[
          {
            id: 1,
            name: 'FeedbackType 1',
          },
          {
            id: 2,
            name: 'FeedbackType 2',
          },
        ]}
        establishmentId={2}
      />
    </>
  );
}
