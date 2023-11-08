import { useTranslation } from 'react-i18next';
import backgroundImage from '@/assets/home-background.png';
import styles from './Home.module.scss';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const { t } = useTranslation('home');
  return (
    <main
      className={styles.Home}
    >
      <img
        src={backgroundImage}
        className={styles.HomeBackgroundImage}
      />
      <div className={styles.HomeBackgroundColor} />
      <h1 className={ styles.HomeTitle }>{t('title')}</h1>
      <p className="read-the-docs">
        {t('subtitle')}
      </p>
      <SearchBar className={ styles.HomeSearchBar }/>
    </main>
  );
}
