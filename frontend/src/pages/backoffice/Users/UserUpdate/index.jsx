import BackofficeHeader from '@/components/BackofficeHeader';
import UserUpdateForm from '@/components/UserUpdateForm';
import Button from '@/components/lib/Button';
import { UserContext } from '@/contexts/api/UserContext';
import { useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export default function EmployeeUpdate() {
  const { user, isUserLoading, getById, patch, isPatchUserLoading } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    getById(id);
  }, []);

  const updateUser = async (data) => {
    await patch(id, data);
    await getById(id);
  };

  const { t } = useTranslation('user');
  return (
    <>
      <BackofficeHeader>
        <h1>{ t('update.title') }</h1>
      </BackofficeHeader>
      <Button to="/backoffice/users">{ t('update.back') }</Button>
      {(!isUserLoading && user) && (
        <>
          <UserUpdateForm
            onSubmit={updateUser}
            isLoading={isPatchUserLoading}
            getById={getById}
            {...user.data}
          />
        </>
      )}
    </>
  );
}
