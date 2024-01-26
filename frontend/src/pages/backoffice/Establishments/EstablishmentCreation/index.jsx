import BackofficeHeader from '@/components/BackofficeHeader';
import EstablishmentCreationForm from '@/components/EstablishmentCreationForm';
import Button from '@/components/lib/Button';
import EstablishmentTypeProvider from '@/contexts/api/EstablishmentTypeContext';

export default function EstablishmentCreation() {

  return (
    <>
      <BackofficeHeader>
        <h1>Création d établissement</h1>
      </BackofficeHeader>
      <Button to="/backoffice/establishments">Retour</Button>
      <EstablishmentTypeProvider>
        <EstablishmentCreationForm />
      </EstablishmentTypeProvider>
    </>
  );
}
