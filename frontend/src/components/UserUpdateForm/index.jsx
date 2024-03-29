import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './UserUpdateForm.module.scss';
import PropTypes from 'prop-types';
import Button from '@/components/lib/Button';
import Input from '@/components/lib/Input';

export default function RegisterUpdateForm({
  lastname,
  firstname,
  phonenumber,
  email,
  roles,
  onSubmit,
  isLoading = false,
}) {
  const { t } = useTranslation('user');

  const allRoles = [
    'ROLE_USER',
    'ROLE_ADMIN',
    'ROLE_PRESTA',
  ];

  const [ form, setForm ] = useState({
    lastname,
    firstname,
    phonenumber,
    email,
    roles,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = {
      lastname: form.lastname,
      firstname: form.firstname,
      phonenumber: form.phonenumber,
      email: form.email,
      roles: form.roles,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.UserUpdateForm} >
      <div className={styles.UserUpdateFormGroup}>
        <label htmlFor="firstname">{t('form.firstname')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="firstname"
          value={form.firstname}
          onChange={(newValue) => setForm({ ...form, firstname: newValue })}
        />
      </div>
      <div className={styles.UserUpdateFormGroup}>
        <label htmlFor="lastname">{t('form.lastname')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="lastname"
          value={form.lastname}
          onChange={(newValue) => setForm({ ...form, lastname: newValue })}
        />
      </div>
      <div className={styles.UserUpdateFormGroup}>
        <label htmlFor="phonenumber">{t('form.phonenumber')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="phonenumber"
          value={form.phonenumber}
          onChange={(newValue) => setForm({ ...form, phonenumber: newValue })}
        />
      </div>
      <div className={styles.UserUpdateFormGroup}>
        <label htmlFor="email">{t('form.email')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="email"
          value={form.email}
          onChange={(newValue) => setForm({ ...form, email: newValue })}
        />
      </div>
      <div className={styles.UserUpdateFormGroup}>
        <label htmlFor="roles">{t('form.roles')}</label>
        {allRoles.map((role) => (
          <div key={role}>
            <input
              type="checkbox"
              id={role}
              value={role}
              onChange={(e) => {
                if (e.target.checked) {
                  setForm({ ...form, roles: [ ...form.roles, role ] });
                } else {
                  setForm({ ...form, roles: form.roles.filter((r) => r !== role) });
                }
              }}
              checked={form.roles.includes(role)}
            />
            <label htmlFor={role}>{role}</label>
          </div>
        ))}
      </div>
      <Button disabled={isLoading} type="submit">
        {t('update', { ns: 'base' })}
      </Button>
    </form>
  );
}

RegisterUpdateForm.propTypes = {
  lastname: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  phonenumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  roles: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  getById: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

