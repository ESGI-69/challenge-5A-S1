import BackofficeHeader from '@/components/BackofficeHeader';
import EstablishmentUpdateForm from '@/components/EstablishmentUpdateForm';
import Button from '@/components/lib/Button';
import OpeningHoursSelector from '@/components/OpeningHoursSelector';
import ServiceTypeSelector from '@/components/ServiceTypeSelector';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { EstablishmentTypeContext } from '@/contexts/api/EstablishmentTypeContext';
import { ServiceTypeContext } from '@/contexts/api/ServiceTypeContext';
import { useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export default function EstablishmentUpdate() {
  const { establishment, getById, isEstablishmentLoading, isPatchEstablishmentLoading, patch: patchEstablishment } = useContext(EstablishmentContext);
  const { establishmentTypes, get: getEstablishmentTypes, isEstablishmentTypesLoading } = useContext(EstablishmentTypeContext);
  const { deleteServiceType, isDeleteServiceTypeLoading, patchServiceType, isPatchServiceTypeLoading } = useContext(ServiceTypeContext);
  const { id } = useParams();
  useEffect(() => {
    getById(id);
    getEstablishmentTypes();
  }, []);

  const updateEstablishment = (data) => {
    patchEstablishment(id, data);
  };

  const updateServiceTypeHandler = async (serviceTypeId, serviceTypeData) => {
    await patchServiceType(serviceTypeId, serviceTypeData);
    establishment.serviceTypes = establishment.serviceTypes.map((serviceType) => {
      if (serviceType.id === serviceTypeId) {
        return { ...serviceType, ...serviceTypeData };
      }
      return serviceType;
    });
  };

  const deleteServiceTypeHandler = async (serviceTypeId) => {
    await deleteServiceType(serviceTypeId);
    establishment.serviceTypes = establishment.serviceTypes.filter((serviceType) => serviceType.id !== serviceTypeId);
  };

  const { t } = useTranslation('establishment');
  return (
    <>
      <BackofficeHeader>
        <h1>{ t('update.title') }</h1>
      </BackofficeHeader>
      <Button to="/backoffice/establishments">{ t('update.back') }</Button>
      {(!isEstablishmentTypesLoading && !isEstablishmentLoading && establishment && establishmentTypes) && (
        <>
          <EstablishmentUpdateForm
            establishmentTypes={establishmentTypes}
            onSubmit={updateEstablishment}
            isLoading={isPatchEstablishmentLoading}
            {...establishment}
          />
          <h2>{ t('serviceType.title') }</h2>
          {(establishment.serviceTypes.length > 0
            ? establishment.serviceTypes.map((serviceType) => (
              <ServiceTypeSelector
                key={serviceType.id}
                {...serviceType}
                isLoading={isDeleteServiceTypeLoading || isPatchServiceTypeLoading}
                onUpdateServiceType={updateServiceTypeHandler}
                onDeleteServiceType={deleteServiceTypeHandler}
              />
            ))
            : <div>
              <span>{ t('serviceType.empty') }</span>
              <Button>ADD</Button>
            </div>
          )}
          <h2>{ t('openingHourSelector') }</h2>
          <OpeningHoursSelector />
        </>
      )}
    </>
  );
}
