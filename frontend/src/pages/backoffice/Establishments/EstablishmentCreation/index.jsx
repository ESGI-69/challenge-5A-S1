import BackofficeHeader from '@/components/BackofficeHeader';
import EstablishmentCreationForm from '@/components/EstablishmentCreationForm';
import Button from '@/components/lib/Button';
import EstablishmentTypeProvider from '@/contexts/api/EstablishmentTypeContext';
import { useTranslation } from 'react-i18next';

export default function EstablishmentCreation() {
  const { t } = useTranslation('establishment');
  return (
    <>
      <BackofficeHeader>
        <h1>{ t('create.title') }</h1>
      </BackofficeHeader>
      <Button to="/backoffice/establishments">{ t('create.back') }</Button>
      <EstablishmentTypeProvider>
        <EstablishmentCreationForm />
      </EstablishmentTypeProvider>
    </>
  );
}
