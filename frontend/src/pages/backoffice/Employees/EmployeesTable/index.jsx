import PTable from '@/components/lib/PTable';
import { ProfileContext } from '@/contexts/ProfileContext';
import { EmployeeContext } from '@/contexts/api/EmployeeContext';
import { useContext, useEffect } from 'react';

export default function EmployeesTable() {
  const { employees, get: getEmployees, isEmployeesLoading } = useContext(EmployeeContext);
  const { profile } = useContext(ProfileContext);

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
    />
  );
}
