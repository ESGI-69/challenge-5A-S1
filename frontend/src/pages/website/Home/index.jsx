import { useTranslation } from 'react-i18next';
import backgroundImage from '@/assets/home-background.jpg';
import styles from './Home.module.scss';

export default function Home() {
  const { t } = useTranslation('main');
  return (
    <main
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className={styles.Home}
    >
      <h1>Home</h1>
      <p className="read-the-docs">
        {t('doc')}
      </p>
    </main>
  );
}
