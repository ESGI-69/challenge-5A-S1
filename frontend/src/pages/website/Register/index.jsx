import Button from '@/components/lib/Button';
import styles from './Register.module.scss';
import RegisterForm from './RegisterForm';
import UserProvider from '@/contexts/api/UserContext';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation('register');
  return (
    <div className={styles.Login}>
      <h1 className={styles.LoginTitle}>{t('title')}</h1>
      <UserProvider>
        <RegisterForm />
      </UserProvider>
      <hr className={styles.LoginSeparator} />
      <div className={styles.LoginRegister}>
        <p className={styles.LoginRegisterText}>{t('loginTitle')}</p>
        <Button href="/login">{t('login')}</Button>
      </div>
    </div>
  );
}
