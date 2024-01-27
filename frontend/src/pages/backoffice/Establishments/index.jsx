import BackofficeHeader from '@/components/BackofficeHeader';
import { useTranslation } from 'react-i18next';
import Button from '@/components/lib/Button';
import EstablishmentProvider from '@/contexts/api/EstablishmentContext';
import MyEstablishmentsTable from './MyEstablishmentsTable';

export default function EstablishmentCreation() {
  const { t } = useTranslation('establishment');

  return (
    <>
      <BackofficeHeader
        actionsComponent={
          <Button to="/backoffice/establishments/create">
            {t('list.actions.create')}
          </Button>
        }
      >
        <h1>{t('list.title')}</h1>
      </BackofficeHeader>
      <EstablishmentProvider>
        <MyEstablishmentsTable />
      </EstablishmentProvider>
    </>
  );
}
