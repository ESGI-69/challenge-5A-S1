import BackofficeHeader from '@/components/BackofficeHeader';
import CompanyProvider from '@/contexts/api/CompanyContext';
import CompaniesValidationTable from '@/pages/backoffice/CompaniesValidation/CompaniesValidationTable';
import CompanyRejectedTable from '@/pages/backoffice/CompaniesValidation/CompaniesRejectedTable';
import { useTranslation } from 'react-i18next';

export default function CompaniesValidation() {
  const { t } = useTranslation('companiesValidation');

  return (
    <>
      <BackofficeHeader>
        <h1>{t('title')}</h1>
      </BackofficeHeader>
      <h2>{t('watingForReview')}</h2>
      <CompanyProvider>
        <CompaniesValidationTable />
      </CompanyProvider>
      <h2>{t('rejected')}</h2>
      <CompanyProvider>
        <CompanyRejectedTable />
      </CompanyProvider>
    </>
  );
}
