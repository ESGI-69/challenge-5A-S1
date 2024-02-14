import { useTranslation } from 'react-i18next';
import PTable from '@/components/lib/PTable';
import { ProfileContext } from '@/contexts/ProfileContext';
import { EmployeeContext } from '@/contexts/api/EmployeeContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeesTable() {
  const { t } = useTranslation('employee');
  const { employees, get: getEmployees, isEmployeesLoading } = useContext(EmployeeContext);
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees(profile.company.id);
  }, []);

  const DATA_TEMPLATE = {
    properties: {
      id: {
        width: '50px',
      },
      firstname: {
        name: 'Prénom',
        width: '120px',
      },
      lastname: {
        name: 'Nom',
        width: '120px',
      },
    },
  };

  return (
    <PTable
      template={DATA_TEMPLATE}
      data={employees}
      loading={isEmployeesLoading}
      actions={[
        {
          name: t('table.actions.edit'),
          onClick: ({ id }) => navigate(`/backoffice/employees/${id}`),
        },
        {
          name: t('table.actions.delete'),
          onClick: ({ id }) => navigate(`/backoffice/employees/delete/${id}`),
        },
      ]}
    />
  );
}
