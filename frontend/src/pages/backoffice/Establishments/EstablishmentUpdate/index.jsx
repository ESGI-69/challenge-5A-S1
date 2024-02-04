import BackofficeHeader from '@/components/BackofficeHeader';
import EstablishmentUpdateForm from '@/components/EstablishmentUpdateForm';
import Button from '@/components/lib/Button';
import OpeningHoursSelector from '@/components/OpeningHoursSelector';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { EstablishmentTypeContext } from '@/contexts/api/EstablishmentTypeContext';
import { useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export default function EstablishmentUpdate() {
  const { establishment, getById, isEstablishmentLoading } = useContext(EstablishmentContext);
  const { establishmentTypes, get: getEstablishmentTypes, isEstablishmentTypesLoading } = useContext(EstablishmentTypeContext);
  const { id } = useParams();
  useEffect(() => {
    getById(id);
    getEstablishmentTypes();
  }, []);

  const updateEstablishment = (data) => {
    console.log(data);
  };

  const { t } = useTranslation('establishment');
  return (
    <>
      <BackofficeHeader>
        <h1>{ t('update.title') }</h1>
      </BackofficeHeader>
      <Button to="/backoffice/establishments">{ t('update.back') }</Button>
      {(!isEstablishmentTypesLoading && !isEstablishmentLoading && establishment && establishmentTypes) && (
        <EstablishmentUpdateForm
          establishmentTypes={establishmentTypes}
          onSubmit={updateEstablishment}
          {...establishment}
        />
      )}
      <h2>{ t('openingHourSelector') }</h2>
      {(!isEstablishmentLoading && establishment) && <OpeningHoursSelector />}
    </>
  );
}
