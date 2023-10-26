import LanguageSwticher from '@/components/LanguageSwitcher';
import Button from '@/components/lib/Button';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Header() {
  const { t } = useTranslation('header');
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__home}>
        <Link className={styles.navbar__home__link} to="/">Platiny</Link>
      </div>
      <div className={styles.navbar__menu}>
        <LanguageSwticher />
        <Link to="/register" className={styles.navbar__menu__link}>{t('menu.register')}</Link>
        <Button href="/login" variant="primary">{t('menu.login')}</Button>
      </div>
    </nav>
  );
}
