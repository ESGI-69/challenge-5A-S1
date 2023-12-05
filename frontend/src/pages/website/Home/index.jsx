import { useTranslation } from 'react-i18next';
import backgroundImage from '@/assets/home-background.png';
import styles from './Home.module.scss';
import SearchBar from '@/components/SearchBar';
import CompanyProvider from '@/contexts/api/CompanyContext';
import { useNavigate } from 'react-router-dom';
import queryBuilder from '@/utils/queryBuilder';

export default function Home() {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const navToSearchPage = (searchData) => {
    navigate(`/search${queryBuilder(searchData)}`);
  };
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
      <CompanyProvider>
        <SearchBar
          className={ styles.HomeSearchBar }
          onSearch={navToSearchPage}
        />
      </CompanyProvider>
    </main>
  );
}
