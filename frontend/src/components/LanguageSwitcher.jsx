import { useTranslation } from 'react-i18next';

const languages  = {
  en: { label: 'English' },
  fr: { label: 'Français' },
};

function LanguageSwticher() {
  const { i18n } = useTranslation();

  return (
    <div>
      {Object.keys(languages).map((language) => (
        <button key={language} onClick={() => i18n.changeLanguage(language)} disabled={i18n.resolvedLanguage === language}>
          {languages[language].label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwticher;
