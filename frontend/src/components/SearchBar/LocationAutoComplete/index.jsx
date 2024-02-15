import { useContext, useEffect } from 'react';
import styles from './LocationAutoComplete.module.scss';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LocationAutoComplete = ({ ...delegated }) => {
  const { establishments, isEstablishmentsLoading, getCities } = useContext(EstablishmentContext);
  const { t } = useTranslation('searchbar');

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div className={styles.LocationAutocomplete} {...delegated}>
      {!isEstablishmentsLoading
        ? (
          establishments && establishments.length > 0
            ? establishments.map((establishment) =>
              <Link className={styles.LocationAutocompleteType} to={`/search?location=${establishment.city}`} key={establishment.city}>
                {establishment.city}
              </Link>,
            )
            : <span>???</span>
        )
        : <span>{t('loading', { ns: 'base' })}</span>
      }
    </div>
  );
};

LocationAutoComplete.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
  })).isRequired,
  isLocationLoading: PropTypes.bool.isRequired,
};

export default LocationAutoComplete;
