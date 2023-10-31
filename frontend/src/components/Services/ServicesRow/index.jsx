import style from './ServicesRow.module.scss';
import PropTypes from 'prop-types';
import Button from '../../lib/Button';
import { minToDuration } from '@/utils/formater/time';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ServicesRow({
  name,
  description,
  price,
  duration,
}) {
  const { t } = useTranslation('servicesTable');

  const [ isExpanded, setIsExpanded ] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={style.ServicesRow}>
      <div className={style.ServicesRowDesc}>
        <span>{name}</span>
        <div className={`${style.ServicesRowDescDetail} ${isExpanded ? style.Expanded : style.Collapsed}`}>
          <span>
            {description}
          </span>
        </div>
        <button
          className={style.ServicesRowDescShowMore}
          onClick={toggleExpand}>{isExpanded ? t('less') : t('more')}
        </button>
      </div>
      <div className={style.ServicesRowInfos}>
        <span>{minToDuration(duration)}</span>
        <span>•</span>
        <span>{price} €</span>
      </div>
      <Button className={style.ServicesRowBtn} variant="dark">Choisir</Button>
    </div>
  );
}

ServicesRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  price: PropTypes.number,
  duration: PropTypes.number,
};

export default ServicesRow;
