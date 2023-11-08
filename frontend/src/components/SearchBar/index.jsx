import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from '@/components/lib/Input';
import Button from '@/components/lib/Button';
import style from './SearchBar.module.scss';

function SearchBar({
  className,
}) {
  const { t } = useTranslation('searchbar');

  return (
    <div className={`${style.SearchBar} ${className}`}>
      <Input variant="no-border" placeholder={t('name.placeholder')} />
      <div className={ style.SearchBarSeparator } />
      <Input variant="no-border" placeholder={t('location.placeholder')} />
      <Button variant="black">
        {t('search')}
      </Button>
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.node,
};

export default SearchBar;
