import style from './ServicesTable.module.scss';
import PropTypes from 'prop-types';
import ServicesRow from '../ServicesRow';

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
          <ServicesRow
            key={service.id}
            name={service.name}
            description={service.description}
            price={service.price}
            duration={service.duration}
          />
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
