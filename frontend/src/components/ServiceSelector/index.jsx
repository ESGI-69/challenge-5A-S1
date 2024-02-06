import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './ServiceSelector.module.scss';
import Button from '../lib/Button';
import PropTypes from 'prop-types';
import Input from '../lib/Input';

export default function ServiceSelector({
  id,
  name,
  description,
  duration,
  price,
  onUpdateService,
  onDeleteService,
}) {
  const { t } = useTranslation('service');

  const [ service, setService ] = useState({
    id,
    name,
    description,
    duration,
    price,
  });

  return (
    <div className={style.ServiceSelector}>
      <h3>{ t('service') }</h3>
      <div className={style.ServiceSelectorInfo}>
        <div className={style.ServiceSelectorInfoData}>
          <label htmlFor="name">{ t('name') }</label>
          <Input
            id="name"
            value={service.name}
            onChange={(newValue) => setService({ ...service, name: newValue })}
          />
        </div>
        <div className={style.ServiceSelectorInfoData}>
          <label htmlFor="description">{ t('description') }</label>
          <textarea
            style={{ flexGrow: 1 }}
            id="description"
            value={service.description}
            onChange={(e) => setService({ ...service, description: e.target.value })}
          />
        </div>
        <div className={style.ServiceSelectorInfoData}>
          <label htmlFor="duration">{ t('duration') }</label>
          <Input
            id="duration"
            type="number"
            value={service.duration}
            onChange={(newValue) => setService({ ...service, duration: parseInt(newValue) })}
          />
          <span>{ t('minutes', { ns: 'base' }) }</span>
        </div>
        <div className={style.ServiceSelectorInfoData}>
          <label htmlFor="price">{ t('price') }</label>
          <Input
            id="price"
            type="number"
            value={service.price}
            onChange={(newValue) => setService({ ...service, price: parseInt(newValue) })}
          />
          <span>€</span>
        </div>
      </div>
      <div className={style.ServiceSelectorButtons}>
        <Button onClick={() => onUpdateService(service.id, service)}>{ t('action.update') }</Button>
        <Button variant="danger" onClick={() => onDeleteService(service.id)}>{ t('action.delete') }</Button>
      </div>
    </div>
  );
}

ServiceSelector.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  duration: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onUpdateService: PropTypes.func.isRequired,
  onDeleteService: PropTypes.func.isRequired,
};

