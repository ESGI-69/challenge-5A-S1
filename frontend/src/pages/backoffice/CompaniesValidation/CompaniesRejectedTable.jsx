import { useTranslation } from 'react-i18next';
import PTable from '@/components/lib/PTable';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { dateTime } from '@/utils/formater/date';
import { useContext, useEffect } from 'react';

export default function CompanyValidation() {
  const { t } = useTranslation('companiesValidation');
  const {
    adminGet,
    companies,
    isCompaniesLoading,
  } = useContext(CompanyContext);

  useEffect(() => {
    adminGet({ 'exists[rejectedReason]': true });
  }, []);

  const DATA_TEMPLATE = {
    properties: {
      id: {
        width: '50px',
      },
      name: {
        name: t('table.titles.name'),
        width: '200px',
      },
      email: {
        name: t('table.titles.email'),
        width: '300px',
      },
      rejectedReason: {
        name: t('table.titles.rejectedReason'),
        width: '500px',
      },
      updatedAt: {
        name: t('table.titles.requestedAt'),
        width: '150px',
        formatingMethod: dateTime,
      },
    },
  };

  return (
    <PTable
      template={DATA_TEMPLATE}
      data={companies}
      loading={isCompaniesLoading}
      isActionHidden={true}
    />
  );
}
