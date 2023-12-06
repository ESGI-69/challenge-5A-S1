import PTable from '@/components/lib/PTable';
import Tag from '@/components/lib/Tag';
import { UserContext } from '@/contexts/api/UserContext';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

function RolesTag({ value }) {
  return (
    <>
      {value.map((role) => <Tag variant="primary" key={role}>{role}</Tag>)}
    </>
  );
}
RolesTag.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
};

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
        component: RolesTag,
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
