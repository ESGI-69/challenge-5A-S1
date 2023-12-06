import BackofficeHeader from '@/components/BackofficeHeader';
import PTable from '@/components/lib/PTable';
import EmployeesTable from './EmployeesTable';
import UserProvider from '@/contexts/api/UserContext';

export default function Employees() {

  return (
    <>
      <BackofficeHeader>
        <h1>Employés</h1>
      </BackofficeHeader>
      <UserProvider>
        <EmployeesTable></EmployeesTable>
      </UserProvider>
    </>
  );
}
