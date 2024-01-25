import BackofficeHeader from '@/components/BackofficeHeader';
import EstablishmentCreationForm from '@/components/EstablishmentCreationForm';
import EstablishmentTypeProvider from '@/contexts/api/EstablishmentTypeContext';

export default function EstablishmentCreation() {

  return (
    <>
      <BackofficeHeader>
        <h1>Création d établissement</h1>
      </BackofficeHeader>
      <EstablishmentTypeProvider>
        <EstablishmentCreationForm />
      </EstablishmentTypeProvider>
    </>
  );
}
