import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileContext } from '@/contexts/ProfileContext';
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
  onSumbit,
}) {
  const { t } = useTranslation('establishment');
  const { profile } = useContext(ProfileContext);

  const [ form, setForm ] = useState({
    email,
    type,
    street,
    city,
    zipCode,
    country,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      company: `/api/companies/${profile.company.id}`,
      email: form.email,
      type: `/api/establishment_types/${form.type}`,
      street: form.street,
      city: form.city,
      zipCode: form.zipCode,
      country: form.country,
    };
    onSumbit(data);
  };

  console.log(form);

  return (
    <form onSubmit={handleFormSubmit} className={styles.EstablishmentUpdateForm}>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="email">{t('form.email')}</label>
        <Input
          type="email"
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="type">{t('form.establishmentType')}</label>
        <select
          id="type"
          value={form.type.id}
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
          type="text"
          id="street"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="city">{t('form.city')}</label>
        <Input
          type="text"
          id="city"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="zipCode">{t('form.zipCode')}</label>
        <Input
          type="text"
          id="zipCode"
          value={form.zipCode}
          onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
        />
      </div>
      <div className={styles.EstablishmentUpdateFormGroup}>
        <label htmlFor="country">{t('form.country')}</label>
        <Input
          type="text"
          id="country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
      </div>
      <Button type="submit">
        {t('update', { ns: 'base' })}
      </Button>
    </form>
  );
}

RegisterUpdateForm.propTypes = {
  establishmentTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  type: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  email: PropTypes.string,
  street: PropTypes.string,
  city: PropTypes.string,
  zipCode: PropTypes.string,
  country: PropTypes.string,
  onSumbit: PropTypes.func,
};

