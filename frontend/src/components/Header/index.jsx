import LanguageSelector from '@/components/LanguageSelector';
import Button from '@/components/lib/Button';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Header() {
  const { t } = useTranslation('header');
  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarHome}>
        <Link className={styles.NavbarHomeLink} to="/">Platiny</Link>
      </div>
      <div className={styles.NavbarMenu}>
        <LanguageSelector />
        <Link to="/register" className={styles.NavbarMenuLink}>{t('menu.register')}</Link>
        {/* should be dark variant */}
        <Button to="/login" variant="primary">{t('menu.login')}</Button>
      </div>
    </nav>
  );
}
