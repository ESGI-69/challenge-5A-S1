import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/api/UserContext';
import Input from '@/components/lib/Input';
import styles from './RegisterForm.module.scss';
import Button from '@/components/lib/Button';

export default function RegisterForm() {
  const User = useContext(UserContext);

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
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      phonenumber: formData.get('phone'),
      email: formData.get('email'),
      plainPassword: formData.get('password'),
    };
    User.post(data);
  };

  return (
    <form className={styles.Form} onSubmit={handleFormSubmit}>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={firstnameInput.id}>Prénom *</label>
        <Input
          id={firstnameInput.id}
          name={firstnameInput.name}
          placeholder="Prénom"
          disabled={User.isUserLoading}
          value={firstnameInput.value}
          onInput={handleFirstnameInputChange}
          required
        />
      </div>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={lastnameInput.id}>Nom *</label>
        <Input
          id={lastnameInput.id}
          name={lastnameInput.name}
          placeholder="Nom"
          disabled={User.isUserLoading}
          value={lastnameInput.value}
          onInput={handleLastnameInputChange}
          required
        />
      </div>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={phoneInput.id}>Téléphone *</label>
        <Input
          id={phoneInput.id}
          name={phoneInput.name}
          type="tel"
          placeholder="Téléphone"
          disabled={User.isUserLoading}
          value={phoneInput.value}
          onInput={handlePhoneInputChange}
          required
        />
      </div>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={emailInput.id}>Email *</label>
        <Input
          id={emailInput.id}
          name={emailInput.name}
          type="email"
          placeholder="Email"
          disabled={User.isUserLoading}
          value={emailInput.value}
          onInput={handleEmailInputChange}
        />
      </div>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={passwordInput.id}>Mot de passe *</label>
        <Input
          id={passwordInput.id}
          name={passwordInput.name}
          type="password"
          placeholder="Mot de passe"
          disabled={User.isUserLoading}
          value={passwordInput.value}
          onInput={handlePasswordInputChange}
        />
      </div>
      <Button type="submit" variant="black" disabled={User.isUserLoading}>Créer mon compte</Button>
    </form>
  );
}
