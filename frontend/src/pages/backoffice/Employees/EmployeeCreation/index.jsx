import BackofficeHeader from '@/components/BackofficeHeader';
import EmployeeCreationForm from '@/components/EmployeeCreationForm';
import Button from '@/components/lib/Button';
import EmployeeProvider from '@/contexts/api/EmployeeContext';
import { useTranslation } from 'react-i18next';

export default function EmployeeCreation() {
  const { t } = useTranslation('employee');
  return (
    <>
      <BackofficeHeader>
        <h1>{ t('create.title') }</h1>
      </BackofficeHeader>
      <Button to="/backoffice/employees">{ t('create.back') }</Button>
      <EmployeeProvider>
        <EmployeeCreationForm />
      </EmployeeProvider>
    </>
  );
}
