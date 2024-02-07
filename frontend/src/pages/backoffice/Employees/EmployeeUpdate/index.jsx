import BackofficeHeader from '@/components/BackofficeHeader';
import EmployeeUpdateForm from '@/components/EmployeeUpdateForm';
import Button from '@/components/lib/Button';
import { EmployeeContext } from '@/contexts/api/EmployeeContext';
import { useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export default function EmployeeUpdate() {
  const { employee, getById, isEmployeeLoading, isPatchEmployeeLoading, patch: patchEmployee } = useContext(EmployeeContext);
  const { id } = useParams();
  useEffect(() => {
    getById(id);
  }, []);

  const updateEmployee = (data) => {
    patchEmployee(id, data);
  };

  const { t } = useTranslation('employee');
  return (
    <>
      <BackofficeHeader>
        <h1>{ t('update.title') }</h1>
      </BackofficeHeader>
      <Button to="/backoffice/eemployees">{ t('update.back') }</Button>
      {(!isEmployeeLoading && employee) && (
        <EmployeeUpdateForm
          onSubmit={updateEmployee}
          isLoading={isPatchEmployeeLoading}
          {...employee}
        />
      )}
    </>
  );
}
