import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '@/components/lib/Input';
import Button from '@/components/lib/Button';
import style from './SearchBar.module.scss';
import { useContext, useEffect, useState } from 'react';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { useDebounce } from '@/hooks/useDebounce';
import EstablishmentTypeProvider from '@/contexts/api/EstablishmentTypeContext';
import NameAutocomplete from './NameAutocomplete';

function SearchBar({
  className,
  onSearch,
  isLoading = false,
}) {
  const { t } = useTranslation('searchbar');
  const { get: getCompanies, companies, isCompaniesLoading } = useContext(CompanyContext);
  const [ name, setName ] = useState('');
  const [ location, setLocation ] = useState('');
  const debouncedName = useDebounce(name, 500);

  useEffect(() => {
    if (debouncedName !== '') {
      getCompanies({ name: debouncedName });
    }
  }, [ debouncedName ]);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    onSearch({ name, location });
  };

  return (
    <form className={`${style.SearchBar} ${className}`} onSubmit={handleFormSubmission}>
      <Input
        variant="no-border"
        placeholder={t('name.placeholder')}
        disabled={isLoading}
        onInput={(e) => setName(e.target.value)}
      />
      <EstablishmentTypeProvider>
        <NameAutocomplete
          companies={companies}
          isLoading={isCompaniesLoading}
        />
      </EstablishmentTypeProvider>
      <div className={ style.SearchBarSeparator } />
      <Input
        variant="no-border"
        placeholder={t('location.placeholder')}
        disabled={isLoading}
        onInput={(e) => setLocation(e.target.value)}
      />
      <Button variant="black" type="submit">
        {t('search')}
      </Button>
    </form>
  );
}

SearchBar.propTypes = {
  className: PropTypes.node,
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default SearchBar;
