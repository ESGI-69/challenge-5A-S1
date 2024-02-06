import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ServiceTypeSelector.module.scss';
import Button from '../lib/Button';
import PropTypes from 'prop-types';
import Input from '../lib/Input';
import ServiceSelector from '../ServiceSelector';
import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { ServiceContext } from '@/contexts/api/ServiceContext';
import { useParams } from 'react-router-dom';

export default function ServiceTypeSelector({
  id,
  name,
  description,
  services = [],
  isLoading = false,
  onUpdateServiceType,
  onDeleteServiceType,
}) {
  const { t } = useTranslation('service');
  const { patchService, isPatchServiceLoading, deleteService, isDeleteServiceLoading, postService, isPostServiceLoading } = useContext(ServiceContext);
  const { id: establishmentId } = useParams();

  const [ serviceType, setServiceType ] = useState({
    id,
    name,
    description,
  });

  const [ newService, setNewService ] = useState({
    name: '',
    description: '',
    duration: 0,
    price: 0,
  });

  const [ servicesState ] = useState(services);

  const updateServiceHandler = async (serviceId, serviceData) => {
    await patchService(serviceId, {
      ...serviceData,
      type: `api/service_types/${id}`,
      establishment: `api/establishments/${establishmentId}`,
    });
    servicesState.forEach((service, index) => {
      if (service.id === serviceId) {
        servicesState[index] = { ...service, ...serviceData };
      }
    });
  };

  const deleteServiceHandler = async (serviceId) => {
    await deleteService(serviceId);
    servicesState.filter((service) => service.id !== serviceId);
  };

  const createServiceHandler = async () => {
    const responseService = await postService({
      ...newService,
      type: `api/service_types/${id}`,
      establishment: `api/establishments/${establishmentId}`,
    });
    servicesState.push(responseService);
    setNewService({
      name: '',
      description: '',
      duration: 0,
      price: 0,
    });
    setIsServiceModalOpen(false);
  };

  const [ isServiceModalOpen, setIsServiceModalOpen ] = useState(false);

  return (
    <div className={styles.ServiceTypeSelector}>
      <h3>{ t('serviceType.serviceType', { ns: 'establishment' }) }</h3>
      <div className={styles.ServiceTypeSelectorInfo}>
        <div className={styles.ServiceTypeSelectorInfoData}>
          <label htmlFor="name">{ t('name') }</label>
          <Input
            id="name"
            disabled={isLoading}
            value={serviceType.name}
            onChange={(newValue) => setServiceType({ ...serviceType, name: newValue })}
          />
        </div>
        <div className={styles.ServiceTypeSelectorInfoData}>
          <label htmlFor="description">{ t('description') }</label>
          <textarea
            id="description"
            disabled={isLoading}
            value={serviceType.description}
            onChange={(e) => setServiceType({ ...serviceType, description: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.ServiceTypeSelectorActions}>
        <Button
          onClick={() => onUpdateServiceType(serviceType.id, { name: serviceType.name, description: serviceType.description })}
          disabled={isLoading}
        >
          { t('update', { ns: 'base' }) }
        </Button>
        <Button
          variant='danger'
          onClick={() => onDeleteServiceType(id)}
          disabled={isLoading}
        >
          { t('delete', { ns: 'base' }) }
        </Button>
      </div>
      <div className={styles.ServiceTypeSelectorServices}>
        {servicesState.length > 0
          ? servicesState.map((service) => (
            <ServiceSelector
              key={service.id}
              {...service}
              isLoading={isPatchServiceLoading || isDeleteServiceLoading}
              onUpdateService={updateServiceHandler}
              onDeleteService={deleteServiceHandler}
            />
          ))
          : <span>{ t('empty') }</span>
        }
      </div>
      <Button onClick={() => setIsServiceModalOpen(true)}>{ t('action.create') }</Button>
      <Modal style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          width: '500px',
          height: 'fit-content',
          margin: 'auto',
        },
      }} ariaHideApp={false} isOpen={isServiceModalOpen}>
        <div className={styles.ServiceTypeSelectorModal}>
          <XMarkIcon className={styles.ServiceTypeSelectorModalClose} onClick={() => setIsServiceModalOpen(false)} />
          <h1 className={styles.ServiceTypeSelectorModalTitle}>{t('modal.title')}</h1>
          <label htmlFor="name">{t('name')}</label>
          <Input type="text" placeholder={t('name')} value={newService.name} onChange={(newValue) => setNewService({ ...newService, name: newValue })} disabled={isPostServiceLoading} />

          <label htmlFor="description">{t('description')}</label>
          <textarea placeholder={t('description')} value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} style={{ width: '100%' }} disabled={isPostServiceLoading} />

          <label htmlFor="duration">{t('duration')}</label>
          <Input type="number" placeholder={t('duration')} value={newService.duration} onChange={(newValue) => setNewService({ ...newService, duration: parseInt(newValue) })} disabled={isPostServiceLoading} />
          <span>{ t('minutes', { ns: 'base' }) }</span>

          <label htmlFor="price">{t('price')}</label>
          <Input type="number" placeholder={t('price')} value={newService.price} onChange={(newValue) => setNewService({ ...newService, price: parseInt(newValue) })} disabled={isPostServiceLoading} />
          <span>€</span>

          <div className={styles.ServiceTypeSelectorModalButtons}>
            <Button disabled={isPostServiceLoading} onClick={createServiceHandler}>{t('modal.create')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

ServiceTypeSelector.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  services: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })),
  isLoading: PropTypes.bool,
  onUpdateServiceType: PropTypes.func.isRequired,
  onDeleteServiceType: PropTypes.func.isRequired,
};

