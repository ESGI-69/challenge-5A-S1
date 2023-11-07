import Button from '@/components/lib/Button';
import styles from './Register.module.scss';
import RegisterForm from './RegisterForm';
import UserProvider from '@/contexts/api/UserContext';

export default function Login() {

  return (
    <div className={styles.Login}>
      <h1 className={styles.LoginTitle}>Vous êtes nouveau sur Platiny ?</h1>
      <UserProvider>
        <RegisterForm />
      </UserProvider>
      <hr className={styles.LoginSeparator} />
      <div className={styles.LoginRegister}>
        <p className={styles.LoginRegisterText}>Déjà inscris ?</p>
        <Button href="/login">Se connecter</Button>
      </div>
    </div>
  );
}
