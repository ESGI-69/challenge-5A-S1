import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '@/components/lib/Input';
import Button from '@/components/lib/Button';
import style from './SearchBar.module.scss';
import { useState } from 'react';

function SearchBar({
  className,
  onSearch,
  isLoading = false,
}) {
  const { t } = useTranslation('searchbar');
  const [ searchForm, setSearchForm ] = useState({ name: '', location: '' });

  const handleFormSubmission = (e) => {
    e.preventDefault();
    onSearch(searchForm);
  };

  return (
    <form className={`${style.SearchBar} ${className}`} onSubmit={handleFormSubmission}>
      <Input
        onEnterPressed={onSearch}
        variant="no-border"
        placeholder={t('name.placeholder')}
        disabled={isLoading}
        onInput={(e) => setSearchForm((old) => ({ ...old, name: e.target.value }))}
      />
      <div className={ style.SearchBarSeparator } />
      <Input
        onEnterPressed={onSearch}
        variant="no-border"
        placeholder={t('location.placeholder')}
        disabled={isLoading}
        onInput={(e) => setSearchForm((old) => ({ ...old, location: e.target.value }))}
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
