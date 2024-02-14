import BackofficeHeader from '@/components/BackofficeHeader';
import UserCreationForm from '@/components/UserCreationForm';
import Button from '@/components/lib/Button';
import UserProvider from '@/contexts/api/UserContext';
import { useTranslation } from 'react-i18next';

export default function UserCreation() {
  const { t } = useTranslation('user');
  return (
    <>
      <BackofficeHeader>
        <h1>{ t('create.title') }</h1>
      </BackofficeHeader>
      <Button to="/backoffice/users">{ t('create.back') }</Button>
      <UserProvider>
        <UserCreationForm />
      </UserProvider>
    </>
  );
}
