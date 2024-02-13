import { useContext, useEffect } from 'react';
import styles from './NameAutocomplete.module.scss';
import { EstablishmentTypeContext } from '@/contexts/api/EstablishmentTypeContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NameAutocomplete = ({ companies, isLoading, ...delegated }) => {
  const { establishmentTypes, isEstablishmentTypesLoading, get } = useContext(EstablishmentTypeContext);
  const { t } = useTranslation('searchbar');

  useEffect(() => {
    get();
  }, []);

  return (
    <div className={styles.NameAutocomplete} {...delegated}>
      {!isLoading
        ? (
          companies.length > 0 && companies.map((company) => (
            company.establishments.length > 0 && (
              <Link className={styles.NameAutocompleteCompany} to={`/search?companyId=${company.id}`} key={company.id}>
                <img src={`${import.meta.env.VITE_API_DOMAIN}${company.logoPath}` || 'https://placehold.co/600x400'} />
                <span>
                  {company.name}
                </span>
              </Link>
            )
          ))
        )
        : <span>{t('loading', { ns: 'base' })}</span>
      }
      {(!isLoading && companies.length) > 0 && <div className={styles.NameAutocompleteSeparator} />}
      {!isEstablishmentTypesLoading
        ? (
          establishmentTypes.length > 0
            ? establishmentTypes.map((establishmentType) =>
              <Link className={styles.NameAutocompleteType} to={`/search?establishmentTypeId=${establishmentType.id}`} key={establishmentType.id}>
                {establishmentType.name}
              </Link>,
            )
            : <span>???</span>
        )
        : <span>{t('loading', { ns: 'base' })}</span>
      }
    </div>
  );
};

NameAutocomplete.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logoPath: PropTypes.string,
    establishments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default NameAutocomplete;
