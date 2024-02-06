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
  onUpdateServiceType,
  onDeleteServiceType
}) {
  const { t } = useTranslation('establishment');

  const [ serviceType, setServiceType ] = useState({
    id,
    name,
    description,
  });

  const [ services, setServices ] = useState(services);

  return (
    <div className={styles.serviceTypeSelector}>
      <div className={styles.serviceTypeSelectorInfo}>
        <div className={styles.serviceTypeSelectorInfoRow}>
          <label htmlFor="name">{ t('name') }</label>
          <Input
            id="name"
            value={serviceType.name}
            onChange={(newValue) => setServiceType({ ...serviceType, name: newValue })}
          />
        </div>
        <div className={styles.serviceTypeSelectorInfoRow}>
          <label htmlFor="description">{ t('description') }</label>
          <Input
            id="description"
            value={serviceType.description}
            onChange={(newValue) => setServiceType({ ...serviceType, description: newValue })}
          />
        </div>
      </div>
      <div className={styles.serviceTypeSelectorServices}>
        {services.map((service) => (
          <span>{service.name}</span>
        ))}
      </div>
      <Button onClick={() => onUpdateServiceType({ id, name, description })}>{ t('update') }</Button>
      <Button onClick={() => onDeleteServiceType({ id })}>{ t('delete') }</Button>
    </div>
  );
}

ServiceTypeSelector.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  services: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })),
  onUpdateServiceType: PropTypes.func.isRequired,
  onDeleteServiceType: PropTypes.func.isRequired,
};

