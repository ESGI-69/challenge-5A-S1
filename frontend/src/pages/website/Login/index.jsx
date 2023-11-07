import Input from '@/components/lib/Input';
import { Link } from 'react-router-dom';
import Button from '@/components/lib/Button';
import styles from './Login.module.scss';
import { useState } from 'react';
import apiCall from '@/axios';

export default function Login() {
  const [ emailInput, setEmailInput ] = useState({
    id: crypto.randomUUID(),
    name: 'email',
    value: '',
  });
  const [ passwordInput, setPasswordInput ] = useState({
    id: crypto.randomUUID(),
    name: 'password',
    value: '',
  });

  const handleEmailInputChange = (e) => {
    setEmailInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handlePasswordInputChange = (e) => {
    setPasswordInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    // @todo send data to server + manage token
  };

  return (
    <div className={styles.Login}>
      <h1 className={styles.LoginTitle}>Vous avez déjà utilisé Platiny ?</h1>
      <form className={styles.LoginForm} onSubmit={handleFormSubmit}>
        <div className={styles.LoginFormField}>
          <label className={styles.LoginFormFieldLabel} htmlFor={emailInput.id}>Email *</label>
          <Input
            id={emailInput.id}
            name={emailInput.name}
            placeholder="Email"
            value={emailInput.value}
            onInput={handleEmailInputChange}
          />
        </div>
        <div className={styles.LoginFormField}>
          <label className={styles.LoginFormFieldLabel} htmlFor={passwordInput.id}>Mot de passe *</label>
          <Input
            id={passwordInput.id}
            name={passwordInput.name}
            placeholder="Mot de passe"
            type="password"
            value={passwordInput.value}
            onInput={handlePasswordInputChange} />
        </div>
        <Link className={styles.LoginFormLink} to="/forgot-password">Mot de passe oublié ?</Link>
        <Button>Se connecter</Button>
      </form>
      <hr className={styles.LoginSeparator} />
      <div className={styles.LoginRegister}>
        <p className={styles.LoginRegisterText}>Nouveau sur Platiny ?</p>
        <Button href="/register">Créer mon compte</Button>
      </div>
    </div>
  );
}
