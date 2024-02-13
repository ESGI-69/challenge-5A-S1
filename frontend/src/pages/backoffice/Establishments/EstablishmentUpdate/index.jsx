import BackofficeHeader from '@/components/BackofficeHeader';
import EstablishmentUpdateForm from '@/components/EstablishmentUpdateForm';
import Button from '@/components/lib/Button';
import OpeningHoursSelector from '@/components/OpeningHoursSelector';
import ServiceTypeSelector from '@/components/ServiceTypeSelector';
import EstablishmentPicturesDelete from '@/components/EstablishmentPicturesDelete';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { EstablishmentTypeContext } from '@/contexts/api/EstablishmentTypeContext';
import { ServiceTypeContext } from '@/contexts/api/ServiceTypeContext';
import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import style from './EstablishmentUpdate.module.scss';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Input from '@/components/lib/Input';
import FeedbackTypePrestaSelector from '@/components/FeedbackTypePrestaSelector';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ServiceProvider from '@/contexts/api/ServiceContext';
import FeedbackTypeProvider from '@/contexts/api/FeedbackTypeContext';

export default function EstablishmentUpdate() {
  const { establishment, getById, isEstablishmentLoading, isPatchEstablishmentLoading, patch: patchEstablishment, isPostEstablishmentPictureLoading, postEstablishmentPicture, isDeletePictureEstablishmentLoading, deleteEstablishmentPicture } = useContext(EstablishmentContext);
  const { establishmentTypes, get: getEstablishmentTypes, isEstablishmentTypesLoading } = useContext(EstablishmentTypeContext);
  const {
    postServiceType,
    isPostServiceTypeLoading,
    patchServiceType,
    isPatchServiceTypeLoading,
    deleteServiceType,
    isDeleteServiceTypeLoading,
  } = useContext(ServiceTypeContext);
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

  const createServiceType = async () => {
    const responseServiceType = await postServiceType({ ...newServiceType, establishment: `api/establishments/${id}` });
    establishment.serviceTypes = [ ...establishment.serviceTypes, responseServiceType ];
    setNewServiceType({
      name: '',
      description: '',
    });
    setIsServiceTypeModalOpen(false);
  };

  const postEstablishmentPictureHandler = async (file) => {

    if (file.files && file.files.length > 0) {
      const formData = new FormData();
      formData.append('filePicture', file.files[0]);
      formData.append('establishment', `api/establishments/${id}`);
      await postEstablishmentPicture(formData);
      await getById(id);
    }
  };

  const deleteEstablishmentPictureHandler = async (idPicture) => {
    await deleteEstablishmentPicture(idPicture);
    await getById(id);
  };

  const { t } = useTranslation('establishment');

  const [ isServiceTypeModalOpen, setIsServiceTypeModalOpen ] = useState(false);

  const [ newServiceType, setNewServiceType ] = useState({
    name: '',
    description: '',
  });

  return (
    <div className={style.EstablishmentUpdate}>
      <BackofficeHeader>
        <h1>{ t('update.title') }</h1>
      </BackofficeHeader>
      <Button to="/backoffice/establishments">{ t('update.back') }</Button>
      <Button to={`/establishment/${id}`}>{ t('seeInUserLand', { ns: 'base' }) }</Button>
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
              <ServiceProvider
                key={serviceType.id}
              >
                <ServiceTypeSelector
                  {...serviceType}
                  isLoading={isDeleteServiceTypeLoading || isPatchServiceTypeLoading}
                  onUpdateServiceType={updateServiceTypeHandler}
                  onDeleteServiceType={deleteServiceTypeHandler}
                />
              </ServiceProvider>
            ))
            : <div>
              <span>{ t('serviceType.empty') }</span>
            </div>
          )}
          <Button onClick={() => setIsServiceTypeModalOpen(true)}>{t('serviceType.action.create')}</Button>
          <h2>{ t('openingHourSelector') }</h2>
          <OpeningHoursSelector />
          <h2>{ t('establishmentPicture.deleteForm') }</h2>
          <EstablishmentPicturesDelete
            establishmentPictures={establishment.establishmentPictures}
            deletePictureEstablishment={deleteEstablishmentPictureHandler}
            isDeletePictureEstablishmentLoading={isDeletePictureEstablishmentLoading}
            t={t}
          />
          <h2>{ t('establishmentPicture.uploadForm') }</h2>
          <Input
            id="add-establishment-picture"
            name="filePicture"
            type="file"
            accept="image/jpeg, image/png"
            placeholder={t('form.filePicture')}
            disabled={isPostEstablishmentPictureLoading}
            required
          />
          <Button disabled={isPostEstablishmentPictureLoading} onClick={() => postEstablishmentPictureHandler(document.getElementById('add-establishment-picture'))}>{t('add', { ns: 'base' })}</Button>
          <h2>{ t('feedbackTypeSelector') }</h2>
          <h2>{ t('feedbackTypePrestaSelector')}</h2>
          <FeedbackTypeProvider>
            <FeedbackTypePrestaSelector />
          </FeedbackTypeProvider>
        </>
      )}
      <Modal style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          width: '500px',
          height: 'fit-content',
          margin: 'auto',
        },
      }} ariaHideApp={false} isOpen={isServiceTypeModalOpen}>
        <div className={style.EstablishmentUpdateModal}>
          <XMarkIcon className={style.EstablishmentUpdateModalClose} onClick={() => setIsServiceTypeModalOpen(false)} />
          <h1 className={style.EstablishmentUpdateModalTitle}>{t('serviceType.modal.title')}</h1>
          <label htmlFor="name">{t('serviceType.name')}</label>
          <Input type="text" placeholder={t('serviceType.name')} value={newServiceType.name} onChange={(newValue) => setNewServiceType({ ...newServiceType, name: newValue })} disabled={isPostServiceTypeLoading} />

          <label htmlFor="description">{t('serviceType.description')}</label>
          <textarea placeholder={t('serviceType.description')} value={newServiceType.description} onChange={(e) => setNewServiceType({ ...newServiceType, description: e.target.value })} style={{ width: '100%' }} disabled={isPostServiceTypeLoading} />

          <div className={style.EstablishmentUpdateModalButtons}>
            <Button disabled={isPostServiceTypeLoading} onClick={createServiceType}>{t('serviceType.modal.create')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
