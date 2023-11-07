
import Button from '@/components/lib/Button';
import styles from './Login.module.scss';
import LoginForm from './LoginForm';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation('login');
  return (
    <div className={styles.Login}>
      <h1 className={styles.LoginTitle}>{t('title')}</h1>
      <LoginForm />
      <hr className={styles.LoginSeparator} />
      <div className={styles.LoginRegister}>
        <p className={styles.LoginRegisterText}>{t('registerTitle')}</p>
        <Button href="/register">{t('createAccount')}</Button>
      </div>
    </div>
  );
}
