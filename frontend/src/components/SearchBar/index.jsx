import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '@/components/lib/Input';
import style from './SearchBar.module.scss';
import { useContext, useEffect, useState } from 'react';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { useDebounce } from '@/hooks/useDebounce';
import EstablishmentTypeProvider from '@/contexts/api/EstablishmentTypeContext';
import NameAutocomplete from './NameAutocomplete';
import LocationAutoComplete from './LocationAutoComplete';

function SearchBar({
  className,
  onSearch,
  isLoading = false,
  isLocationLoading = false,
}) {
  const { t } = useTranslation('searchbar');
  const { get: getCompanies, companies, isCompaniesLoading } = useContext(CompanyContext);
  const { get: getEstablishments, establishments, isEstablishmentsLoading } = useContext(EstablishmentContext);
  const [ name, setName ] = useState('');
  const [ location, setLocation ] = useState('');
  const debouncedName = useDebounce(name, 500);
  const debounceLocation = useDebounce(location, 500);

  useEffect(() => {
    if (debouncedName !== '') {
      getCompanies({ name: debouncedName });
    }
    if (debounceLocation !== '') {
      getEstablishments({ city: debounceLocation });
    }
  }, [ debouncedName, debounceLocation ]);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    onSearch({ name, location });
  };

  const [ isNameFormFocused, setIsNameFormFocused ] = useState(false);
  const [ isLocationFormFocused, setIsLocationFormFocused ] = useState(false);

  return (
    <form className={`${style.SearchBar} ${className}`} onSubmit={handleFormSubmission}>
      <Input
        variant="no-border"
        placeholder={t('name.placeholder')}
        disabled={isLoading}
        onInput={(e) => setName(e.target.value)}
        onFocus={() => setIsNameFormFocused(true)}
        onBlur={() => setTimeout(() => setIsNameFormFocused(false), 200)}
      />
      <EstablishmentTypeProvider>
        <NameAutocomplete
          style={{ display: isNameFormFocused ? 'flex' : 'none' }}
          companies={companies}
          isLoading={isCompaniesLoading}
        />
      </EstablishmentTypeProvider>
      <div className={ style.SearchBarSeparator } />
      <Input
        variant="no-border"
        placeholder={t('location.placeholder')}
        disabled={isLocationLoading}
        onInput={(e) => setLocation(e.target.value)}
        onFocus={() => setIsLocationFormFocused(true)}
        onBlur={() => setTimeout(() => setIsLocationFormFocused(false), 200)}
      />
      <LocationAutoComplete
        style={{ display: isLocationFormFocused ? 'flex' : 'none' }}
        locations={establishments}
        isLoading={isEstablishmentsLoading}
      />
      {/* <Button variant="black" type="submit">
        {t('search')}
      </Button> */}
    </form>
  );
}

SearchBar.propTypes = {
  className: PropTypes.node,
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isLocationLoading: PropTypes.bool,
};

export default SearchBar;
