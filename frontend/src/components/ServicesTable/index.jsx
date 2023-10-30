import style from './ServicesTable.module.scss';
import PropTypes from 'prop-types';

function ServicesTable({
  type,
  description,
  services,
}) {

  return (
    <div className={style}>
      <p>{type}</p>
      <p>{description}</p>
      <ul>
        {services?.map((service) => (
          <li key={service.id}>
            <p>{service.name}</p>
            <p>{service.description}</p>
            <p>{service.icon}</p>
            <p>{service.duration}</p>
          </li>
        ))}
      </ul>
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
      duration: PropTypes.number,
    }),
  ),
};

export default ServicesTable;
