import Button from '@/components/lib/Button';
import BackofficeHeader from '@/components/BackofficeHeader';
import EmployeesTable from './EmployeesTable';
import EmployeeProvider from '@/contexts/api/EmployeeContext';

export default function Employees() {

  return (
    <>
      <BackofficeHeader
        actionsComponent={
          <Button to="/backoffice/employees/create">
            Créer un employé
          </Button>
        }
      >
        <h1>Employés</h1>
      </BackofficeHeader>
      <EmployeeProvider>
        <EmployeesTable></EmployeesTable>
      </EmployeeProvider>
    </>
  );
}
