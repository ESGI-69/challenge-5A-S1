import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('main');
  return (
    <main>
      <h1>Home</h1>
      <p className="read-the-docs">
        {t('doc')}
      </p>
    </main>
  );
}
