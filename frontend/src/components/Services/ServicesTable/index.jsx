import { useState } from 'react';
import style from './ServicesTable.module.scss';
import PropTypes from 'prop-types';
import ServicesRow from '../ServicesRow';
import { useTranslation } from 'react-i18next';

function ServicesTable({
  type,
  description,
  services,
}) {
  const [ isExpanded, setIsExpanded ] = useState(false);
  const { t } = useTranslation('servicesTable');

  return (
    <div className={style.Services}>
      <h3 className={style.ServicesType}>{type}</h3>
      <p className={style.ServicesDesc}>{description}</p>
      <div className={style.ServicesTable}>
        {(services && (isExpanded ? services : services.slice(0, 5))).map((service) => (
          <ServicesRow
            key={service.id}
            name={service.name}
            description={service.description}
            price={service.price}
            duration={service.duration}
          />
        ))}
        <a className={style.ServicesTableViewMore} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('less') : t('more')}
        </a>
      </div>
    </div>
  );
}

ServicesTable.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.string,
      price: PropTypes.number,
      duration: PropTypes.number,
    }),
  ),
};

export default ServicesTable;
