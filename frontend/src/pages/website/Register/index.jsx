import Button from '@/components/lib/Button';
import styles from './Register.module.scss';
import RegisterForm from './RegisterForm';
import UserProvider from '@/contexts/api/UserContext';
import { useTranslation } from 'react-i18next';
import sideImage from '@/assets/leaves.jpg';

export default function Login() {
  const { t } = useTranslation('register');
  return (
    <div className={styles.Page}>
      <div className={styles.Login}>
        <h1 className={styles.LoginTitle}>{t('title')}</h1>
        <UserProvider>
          <RegisterForm />
        </UserProvider>
        <hr className={styles.LoginSeparator} />
        <div className={styles.LoginRegister}>
          <p className={styles.LoginRegisterText}>{t('loginTitle')}</p>
          <Button to="/login" variant="black" isPlain>{t('login')}</Button>
        </div>
      </div>
      <div className={styles.PageImage} style={{
        backgroundImage: `url(${sideImage})`,
      }}></div>
    </div>
  );
}
