import BackofficeHeader from '@/components/BackofficeHeader';
import EmployeeUpdateForm from '@/components/EmployeeUpdateForm';
import Button from '@/components/lib/Button';
import { EmployeeContext } from '@/contexts/api/EmployeeContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useContext, useEffect } from 'react';
import WorkingHoursRangeSelector from '@/components/WorkingHoursRangeSelector';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export default function EmployeeUpdate() {
  const { employee, getById, isEmployeeLoading, isPatchEmployeeLoading, patch: patchEmployee } = useContext(EmployeeContext);
  const { establishments, isEstablishmentsLoading, get } = useContext(EstablishmentContext);
  const { profile } = useContext(ProfileContext);
  const { id } = useParams();
  useEffect(() => {
    getById(id);
    get({ 'company.id': profile.company.id });
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
      <Button to="/backoffice/employees">{ t('update.back') }</Button>
      {(!isEstablishmentsLoading && !isEmployeeLoading && employee && establishments) && (
        <>
          <EmployeeUpdateForm
            onSubmit={updateEmployee}
            establishments={establishments}
            isLoading={isPatchEmployeeLoading}
            {...employee}
          />
          <h2>{ t('workingHoursRangeSelector') }</h2>
          <WorkingHoursRangeSelector/>
        </>
      )}
    </>
  );
}
