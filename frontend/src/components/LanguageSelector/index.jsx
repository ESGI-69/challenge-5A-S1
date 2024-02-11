import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from '@/components/lib/Dropdown';
import style from './LanguageSelector.module.scss';
import PropTypes from 'prop-types';

const languages  = {
  en: { label: 'English', icon: '🇺🇸' },
  fr: { label: 'Français', icon: '🇫🇷' },
};

function LanguageSwticher({
  direction = 'br',
}) {
  const { i18n } = useTranslation();

  return (
    <div>
      <Dropdown direction={direction}>
        <DropdownButton className={style.LanguageSelectorButton}>
          {languages[i18n.resolvedLanguage || 'en'].icon}
        </DropdownButton>
        <DropdownList>
          {Object.keys(languages).map((language) => (
            <DropdownItem key={language} onClick={() => i18n.changeLanguage(language)} disabled={i18n.resolvedLanguage === language}>
              {languages[language].icon} {languages[language].label}
            </DropdownItem>
          ))}
        </DropdownList>
      </Dropdown>
    </div>
  );
}

LanguageSwticher.propTypes = {
  direction: PropTypes.oneOf([ 'tl', 'br' ]),
};

export default LanguageSwticher;
