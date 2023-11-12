import Input from '@/components/lib/Input';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import styles from './LoginForm.module.scss';
import Button from '@/components/lib/Button';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const { t } = useTranslation('login');
  const { login } = useContext(ProfileContext);
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
    login(data);
  };

  return (
    <form className={styles.Form} onSubmit={handleFormSubmit}>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={emailInput.id}>{t('form.email')} *</label>
        <Input
          id={emailInput.id}
          name={emailInput.name}
          placeholder={t('form.email')}
          value={emailInput.value}
          onInput={handleEmailInputChange}
        />
      </div>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={passwordInput.id}>{t('form.password')} *</label>
        <Input
          id={passwordInput.id}
          name={passwordInput.name}
          placeholder={t('form.password')}
          type="password"
          value={passwordInput.value}
          onInput={handlePasswordInputChange} />
      </div>
      <Link className={styles.FormLink} to="/forgot-password">{t('form.forgottenPassword')}</Link>
      <Button variant="black">{t('form.login')}</Button>
    </form>
  );
}
