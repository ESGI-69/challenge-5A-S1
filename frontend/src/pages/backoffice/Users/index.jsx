import Button from '@/components/lib/Button';
import BackofficeHeader from '@/components/BackofficeHeader';
import UsersTable from './UsersTable';
import UserProvider from '@/contexts/api/UserContext';
import { useTranslation } from 'react-i18next';

export default function Employees() {

  const { t } = useTranslation('user');

  return (
    <>
      <BackofficeHeader
        actionsComponent={
          <Button to="/backoffice/users/create">
            {t('table.actions.create')}
          </Button>
        }
      >
        <h1>{t('table.title')}</h1>
      </BackofficeHeader>
      <UserProvider>
        <UsersTable></UsersTable>
      </UserProvider>
    </>
  );
}
