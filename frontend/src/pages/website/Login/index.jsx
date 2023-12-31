
import Button from '@/components/lib/Button';
import styles from './Login.module.scss';
import LoginForm from './LoginForm';
import { useTranslation } from 'react-i18next';
import { ProfileContext } from '@/contexts/ProfileContext';
import sideImage from '@/assets/leaves.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

export default function Login() {
  const { t } = useTranslation('login');
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);

  // if allready logged in, redirect to home
  if (profile) {
    navigate('/');
  }

  return (
    <div className={styles.Page}>
      <div className={styles.Login}>
        <h1 className={styles.LoginTitle}>{t('title')}</h1>
        <LoginForm />
        <hr className={styles.LoginSeparator} />
        <div className={styles.LoginRegister}>
          <p className={styles.LoginRegisterText}>{t('registerTitle')}</p>
          <Button to="/register" variant="black" isPlain>{t('createAccount')}</Button>
        </div>
      </div>
      <div className={styles.PageImage} style={{
        backgroundImage: `url(${sideImage})`,
      }}></div>
    </div>
  );
}
