import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ServiceTypeSelector.module.scss';
import Button from '../lib/Button';
import PropTypes from 'prop-types';
import Input from '../lib/Input';

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

  const [ serviceType, setServiceType ] = useState({
    id,
    name,
    description,
  });

  const [ servicesState, setServicesState ] = useState(services);

  return (
    <div className={styles.ServiceTypeSelector}>
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
            onChange={(newValue) => setServiceType({ ...serviceType, description: newValue })}
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
        {servicesState.map((service) => (
          <span
            key={service.id}
            style={{ display: 'block', border: '1px solid black', padding: '5px', margin: '5px' }}
          >
            {service.name}
          </span>
        ))}
      </div>
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

