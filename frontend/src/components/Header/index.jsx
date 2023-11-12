import LanguageSelector from '@/components/LanguageSelector';
import Button from '@/components/lib/Button';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProfileContext } from '@/contexts/ProfileContext';

export default function Header() {
  const { profile, logout } = useContext(ProfileContext);
  const { t } = useTranslation('header');
  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarHome}>
        <Link className={styles.NavbarHomeLink} to="/">Platiny</Link>
      </div>
      <div className={styles.NavbarMenu}>
        <LanguageSelector />
        {profile && (
          <>
            <Button variant="danger" onClick={() => logout()}>Logout</Button>
            <Button href="/profile" variant="black">{profile.firstname}</Button>
          </>
        )}
        {!profile && (
          <>
            <Link to="/register" className={styles.NavbarMenuLink}>{t('menu.register')}</Link>
            <Button to="/login" variant="black">{t('menu.login')}</Button>
          </>
        )}
      </div>
    </nav>
  );
}
