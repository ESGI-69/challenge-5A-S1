import style from './ServicesRow.module.scss';
import PropTypes from 'prop-types';
import Button from '../../lib/Button';
import { minToDuration } from '@/utils/formater/time';

function ServicesRow({
  name,
  description,
  price,
  duration,
}) {
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
