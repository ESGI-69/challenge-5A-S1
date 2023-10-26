import LanguageSwticher from '@/components/LanguageSwitcher';
import Button from '@/components/lib/Button';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation('main');
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__home}>
        <a className={styles.navbar__home__link} href='/'>Platiny</a>
      </div>
      <div className={styles.navbar__menu}>
        <LanguageSwticher />
        <a href="/register" className={styles.navbar__menu__link}>{t('register')}</a>
        <Button href="/login" variant="primary">{t('login')}</Button>
      </div>
    </nav>
  );
}
