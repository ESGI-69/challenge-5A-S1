import PTable from '@/components/lib/PTable';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { useContext, useEffect } from 'react';

export default function CompanyValidation() {
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
        name: '#',
        width: '50px',
      },
      name: {
        name: 'name',
        width: '200px',
      },
      email: {
        name: 'email',
        width: '200px',
      },
      rejected_reason: {
        name: 'Rejected reason',
        width: '200px',
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
