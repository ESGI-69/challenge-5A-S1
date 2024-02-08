import Button from '@/components/lib/Button';
import BackofficeHeader from '@/components/BackofficeHeader';
import EmployeesTable from './EmployeesTable';
import EmployeeProvider from '@/contexts/api/EmployeeContext';
import { useTranslation } from 'react-i18next';

export default function Employees() {

  const { t } = useTranslation('employee');

  return (
    <>
      <BackofficeHeader
        actionsComponent={
          <Button to="/backoffice/employees/create">
            {t('list.actions.create')}
          </Button>
        }
      >
        <h1>{t('list.title')}</h1>
      </BackofficeHeader>
      <EmployeeProvider>
        <EmployeesTable></EmployeesTable>
      </EmployeeProvider>
    </>
  );
}
