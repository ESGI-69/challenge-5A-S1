import Input from '@/components/lib/Input';
import { Link } from 'react-router-dom';
import Button from '@/components/lib/Button';
import styles from './Register.module.scss';
import { useState } from 'react';

export default function Login() {
  const [ firstnameInput, setFirstnameInput ] = useState({
    id: crypto.randomUUID(),
    name: 'firstname',
    value: '',
  });

  const [ lastnameInput, setLastnameInput ] = useState({
    id: crypto.randomUUID(),
    name: 'lastname',
    value: '',
  });

  const [ phoneInput, setPhoneInput ] = useState({
    id: crypto.randomUUID(),
    name: 'phone',
    value: '',
  });

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

  const handleFirstnameInputChange = (e) => {
    setFirstnameInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handleLastnameInputChange = (e) => {
    setLastnameInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handlePhoneInputChange = (e) => {
    setPhoneInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

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
      firtname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    // @todo send data to server + manage token
  };

  return (
    <div className={styles.Login}>
      <h1 className={styles.LoginTitle}>Vous êtes nouveau sur Platiny ?</h1>
      <form className={styles.LoginForm} onSubmit={handleFormSubmit}>
        <div className={styles.LoginFormField}>
          <label className={styles.LoginFormFieldLabel} htmlFor={firstnameInput.id}>Prénom *</label>
          <Input
            id={firstnameInput.id}
            name={firstnameInput.name}
            placeholder="Prénom"
            value={firstnameInput.value}
            onInput={handleFirstnameInputChange}
            required
          />
        </div>
        <div className={styles.LoginFormField}>
          <label className={styles.LoginFormFieldLabel} htmlFor={lastnameInput.id}>Nom *</label>
          <Input
            id={lastnameInput.id}
            name={lastnameInput.name}
            placeholder="Nom"
            value={lastnameInput.value}
            onInput={handleLastnameInputChange}
            required
          />
        </div>
        <div className={styles.LoginFormField}>
          <label className={styles.LoginFormFieldLabel} htmlFor={phoneInput.id}>Téléphone *</label>
          <Input
            id={phoneInput.id}
            name={phoneInput.name}
            type="tel"
            placeholder="Téléphone"
            value={phoneInput.value}
            onInput={handlePhoneInputChange}
            required
          />
        </div>
        <div className={styles.LoginFormField}>
          <label className={styles.LoginFormFieldLabel} htmlFor={emailInput.id}>Email *</label>
          <Input
            id={emailInput.id}
            name={emailInput.name}
            type="email"
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
            type="password"
            placeholder="Mot de passe"
            value={passwordInput.value}
            onInput={handlePasswordInputChange}
          />
        </div>
        <Link className={styles.LoginFormLink} to="/forgot-password">Mot de passe oublié ?</Link>
        <Button>Se connecter</Button>
      </form>
      <hr className={styles.LoginSeparator} />
      <div className={styles.LoginRegister}>
        <p className={styles.LoginRegisterText}>Déjà inscris ?</p>
        <Button href="/login">Se connecter</Button>
      </div>
    </div>
  );
}
