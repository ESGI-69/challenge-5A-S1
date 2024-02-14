import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/api/UserContext';
import Input from '@/components/lib/Input';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './UserCreationForm.module.scss';
import { v4 } from 'uuid';

export default function RegisterForm() {
  const { t } = useTranslation('user');
  const navigate = useNavigate();
  const { post, isPostUserLoading } = useContext(UserContext);

  const [ firstnameInput, setFirstnameInput ] = useState({
    id: v4(),
    name: 'firstname',
    value: '',
  });

  const handleFirstnameInputChange = (e) => {
    setFirstnameInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const [ lastnameInput, setLastnameInput ] = useState({
    id: v4(),
    name: 'lastname',
    value: '',
  });

  const handleLastnameInputChange = (e) => {
    setLastnameInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const [ emailInput, setEmailInput ] = useState({
    id: v4(),
    name: 'email',
    value: '',
  });

  const handleEmailInputChange = (e) => {
    setEmailInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const [ passwordInput, setPasswordInput ] = useState({
    id: v4(),
    name: 'password',
    value: '',
  });

  const handlePasswordInputChange = (e) => {
    setPasswordInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const [ phonenumberInput, setPhonenumberInput ] = useState({
    id: v4(),
    name: 'phonenumber',
    value: '',
  });

  const handlePhonenumberInputChange = (e) => {
    setPhonenumberInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const [ rolesInput, setRolesInput ] = useState({
    id: v4(),
    name: 'roles',
    value: [],
  });

  const handleRolesInputChange = (e) => {
    const role = e.target.name;
    const isChecked = e.target.checked;
    setRolesInput((old) => {
      if (isChecked) {
        return {
          ...old,
          value: [ ...old.value, role ],
        };
      }
      return {
        ...old,
        value: old.value.filter((r) => r !== role),
      };

    });
  };

  const allRoles = [
    'ROLE_USER',
    'ROLE_ADMIN',
    'ROLE_PRESTA',
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      plainPassword: formData.get('password'),
      phonenumber: formData.get('phonenumber'),
      roles: formData.get('roles'),
    };
    await post(data);
    navigate('/backoffice/users');
  };

  return (
    <form className={styles.UserCreationForm} onSubmit={handleFormSubmit}>
      <div className={styles.UserCreationFormField}>
        <label htmlFor={firstnameInput.id} className={styles.UserCreationFormFieldLabel}>{t('form.firstname')} *</label>
        <Input
          id={firstnameInput.id}
          name={firstnameInput.name}
          placeholder={t('form.firstname')}
          disabled={isPostUserLoading}
          value={firstnameInput.value}
          onInput={handleFirstnameInputChange}
          required
        />
      </div>
      <div className={styles.UserCreationFormField}>
        <label htmlFor={lastnameInput.id} className={styles.UserCreationFormFieldLabel}>{t('form.lastname')} *</label>
        <Input
          id={lastnameInput.id}
          name={lastnameInput.name}
          placeholder={t('form.lastname')}
          disabled={isPostUserLoading}
          value={lastnameInput.value}
          onInput={handleLastnameInputChange}
          required
        />
      </div>
      <div className={styles.UserCreationFormField}>
        <label htmlFor={emailInput.id} className={styles.UserCreationFormFieldLabel}>{t('form.email')} *</label>
        <Input
          id={emailInput.id}
          name={emailInput.name}
          placeholder={t('form.email')}
          disabled={isPostUserLoading}
          value={emailInput.value}
          onInput={handleEmailInputChange}
          required
        />
      </div>
      <div className={styles.UserCreationFormField}>
        <label htmlFor={passwordInput.id} className={styles.UserCreationFormFieldLabel}>{t('form.password')} *</label>
        <Input
          id={passwordInput.id}
          type="password"
          name={passwordInput.name}
          placeholder={t('form.password')}
          disabled={isPostUserLoading}
          value={passwordInput.value}
          onInput={handlePasswordInputChange}
          required
        />
      </div>
      <div className={styles.UserCreationFormField}>
        <label htmlFor={phonenumberInput.id} className={styles.UserCreationFormFieldLabel}>{t('form.phonenumber')}</label>
        <Input
          id={phonenumberInput.id}
          name={phonenumberInput.name}
          placeholder={t('form.phonenumber')}
          disabled={isPostUserLoading}
          value={phonenumberInput.value}
          onInput={handlePhonenumberInputChange}
        />
      </div>
      <div className={styles.UserCreationFormField}>
        <label className={styles.UserCreationFormFieldLabel}>{t('form.roles')}</label>
        {allRoles.map((role) => (
          <div key={role}>
            <input
              type="checkbox"
              id={role}
              name={role}
              disabled={isPostUserLoading}
              checked={rolesInput.value.includes(role)}
              onChange={handleRolesInputChange}
            />
            <label htmlFor={role}>{role}</label>
          </div>
        ))}
      </div>
      <Button type="submit" disabled={isPostUserLoading}>{t('form.actions.create')}</Button>
    </form>
  );
}
