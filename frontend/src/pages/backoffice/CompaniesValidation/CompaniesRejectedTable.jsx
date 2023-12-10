import { useTranslation } from 'react-i18next';
import PTable from '@/components/lib/PTable';
import { CompanyContext } from '@/contexts/api/CompanyContext';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      rejected_reason: {
        name: t('table.titles.rejectedReason'),
        width: '500px',
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
