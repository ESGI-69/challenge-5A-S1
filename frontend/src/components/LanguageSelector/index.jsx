import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from '@/components/lib/Dropdown';

const languages  = {
  en: { label: 'English', icon: '🇺🇸' },
  fr: { label: 'Français', icon: '🇫🇷' },
};

function LanguageSwticher() {
  const { i18n } = useTranslation();

  return (
    <div>
      <Dropdown>
        <DropdownButton>
          {languages[i18n.resolvedLanguage || 'en'].icon} {i18n.resolvedLanguage}
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

export default LanguageSwticher;
