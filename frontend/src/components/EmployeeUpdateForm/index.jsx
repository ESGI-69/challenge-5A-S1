import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './EmployeeUpdateForm.module.scss';
import PropTypes from 'prop-types';
import Button from '@/components/lib/Button';
import Input from '@/components/lib/Input';

export default function RegisterUpdateForm({
  lastname,
  firstname,
  avatar,
  establishments,
  preferedEstablishment,
  onSubmit,
  isLoading = false,
}) {
  const { t } = useTranslation('employee');

  const [ form, setForm ] = useState({
    lastname,
    firstname,
    avatar,
    establishments,
    preferedEstablishment: preferedEstablishment.id,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      lastname: form.lastname,
      firstname: form.firstname,
      avatar: form.avatar,
      preferedEstablishment: `/api/establishments/${form.preferedEstablishment}`,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.EmployeeUpdateForm}>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="firstname">{t('form.firstname')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="firstname"
          value={form.firstname}
          onChange={(newValue) => setForm({ ...form, firstname: newValue })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="lastname">{t('form.lastname')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="lastname"
          value={form.lastname}
          onChange={(newValue) => setForm({ ...form, lastname: newValue })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="avatar">{t('form.avatar')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="avatar"
          value={form.avatar}
          onChange={(newValue) => setForm({ ...form, avatar: newValue })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="preferedEstablishment">{t('form.establishmentType')}</label>
        <select
          disabled={isLoading}
          id="preferedEstablishment"
          value={form.preferedEstablishment}
          onChange={(e) => setForm({ ...form, preferedEstablishment: e.target.value })}
        >
          {establishments.map((establishment) => (
            <option key={establishment.id} value={establishment.id}>{establishment.street} - {establishment.city}</option>
          ))}
        </select>
      </div>
      <Button disabled={isLoading} type="submit">
        {t('update', { ns: 'base' })}
      </Button>
    </form>
  );
}

RegisterUpdateForm.propTypes = {
  establishments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  preferedEstablishment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  lastname: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

