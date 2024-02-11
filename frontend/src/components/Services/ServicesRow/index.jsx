import style from './ServicesRow.module.scss';
import PropTypes from 'prop-types';
import Button from '../../lib/Button';
import { Link } from 'react-router-dom';
import { minToDuration } from '@/utils/formater/time';
import { useTranslation } from 'react-i18next';

function ServicesRow({
  id,
  name,
  description,
  price,
  duration,
}) {
  const { t } = useTranslation('servicesTable');
  return (
    <div className={style.ServicesRow}>
      <div className={style.ServicesRowDesc}>
        <span className={style.ServicesRowDescName}>{name}</span>
        <div className={style.ServicesRowDescDetail}>
          <span>
            {description}
          </span>
        </div>
      </div>
      <div className={style.ServicesRowInfos}>
        <span>{minToDuration(duration)}</span>
        <span>•</span>
        <span>{price} €</span>
      </div>
      <div className={style.ServicesRowBtn}>
        <Link to={`/reservation/${id}`}>
          <Button variant="black">{t('choose')}</Button>
        </Link>
      </div>
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
