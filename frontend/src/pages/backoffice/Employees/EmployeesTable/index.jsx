import PTable from '@/components/lib/PTable';
import { UserContext } from '@/contexts/api/UserContext';
import { useContext, useEffect } from 'react';

export default function EmployeesTable() {
  const { users, get: getUsers, isUsersLoading } = useContext(UserContext);

  const DATA_TEMPLATE = {
    properties: {
      id: {
        name: '#',
        width: '50px',
      },
      email: {
        name: 'Email',
        width: '260px',
      },
      firstname: {
        name: 'Prénom',
        width: '120px',
      },
      lastname: {
        name: 'Nom',
        width: '120px',
      },
      phonenumber: {
        name: 'Téléphone',
        width: '130px',
      },
      roles: {
        name: 'Rôles',
      },
    },
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <PTable template={DATA_TEMPLATE} data={users} loading={isUsersLoading}></PTable>
  );
}
