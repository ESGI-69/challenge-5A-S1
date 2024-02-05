import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './EstablishmentUpdateForm.module.scss';
import PropTypes from 'prop-types';
import Button from '@/components/lib/Button';
import Input from '@/components/lib/Input';

export default function RegisterUpdateForm({
  establishmentTypes,
  type,
  email,
  street,
  city,
  zipCode,
  country,
  onSubmit,
  isLoading = false,
}) {
  const { t } = useTranslation('establishment');

  const [ form, setForm ] = useState({
    email,
    type: type.id,
    street,
    city,
    zipCode,
    country,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: form.email,
      type: `/api/establishment_types/${form.type}`,
      street: form.street,
      city: form.city,
      zipCode: form.zipCode,
      country: form.country,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.EstablishmentUpdateForm}>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="email">{t('form.email')}</label>
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          value={form.email}
          onChange={(newValue) => setForm({ ...form, email: newValue })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="type">{t('form.establishmentType')}</label>
        <select
          disabled={isLoading}
          id="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          {establishmentTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="street">{t('form.street')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="street"
          value={form.street}
          onChange={(newValue) => setForm({ ...form, street: newValue })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="city">{t('form.city')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="city"
          value={form.city}
          onChange={(newValue) => setForm({ ...form, city: newValue })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="zipCode">{t('form.zipCode')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="zipCode"
          value={form.zipCode}
          onChange={(newValue) => setForm({ ...form, zipCode: newValue })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="country">{t('form.country')}</label>
        <Input
          disabled={isLoading}
          type="text"
          id="country"
          value={form.country}
          onChange={(newValue) => setForm({ ...form, country: newValue })}
        />
      </div>
      <Button disabled={isLoading} type="submit">
        {t('update', { ns: 'base' })}
      </Button>
    </form>
  );
}

RegisterUpdateForm.propTypes = {
  establishmentTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  type: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  email: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

