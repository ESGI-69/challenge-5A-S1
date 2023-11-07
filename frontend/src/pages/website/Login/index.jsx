
import Button from '@/components/lib/Button';
import styles from './Login.module.scss';
import LoginForm from './LoginForm';

export default function Login() {

  return (
    <div className={styles.Login}>
      <h1 className={styles.LoginTitle}>Vous avez déjà utilisé Platiny ?</h1>
      <LoginForm />
      <hr className={styles.LoginSeparator} />
      <div className={styles.LoginRegister}>
        <p className={styles.LoginRegisterText}>Nouveau sur Platiny ?</p>
        <Button href="/register">Créer mon compte</Button>
      </div>
    </div>
  );
}
