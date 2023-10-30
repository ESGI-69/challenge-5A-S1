import style from './ServicesTable.module.scss';
import PropTypes from 'prop-types';
import Button from '../lib/Button';
import { minToDuration } from '@/utils/formater/time';

function ServicesTable({
  type,
  description,
  services,
}) {

  return (
    <div className={style.Services}>
      <h3 className={style.ServicesType}>{type}</h3>
      <p className={style.ServicesDesc}>{description}</p>
      <div className={style.ServicesTable}>
        {services?.map((service) => (
          <div className={style.ServicesTableRow} key={service.id}>
            <div className={style.ServicesTableRowDesc}>
              <span>{service.name}</span>
              <span>{service.description}</span>
            </div>
            <div className={style.ServicesTableRowInfos}>
              <span>{minToDuration(service.duration)}</span>
              <span>•</span>
              <span>{service.price} €</span>
            </div>

            <Button variant="dark">Choisir</Button>
          </div>
        ))}
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
