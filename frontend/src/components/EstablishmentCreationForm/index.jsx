import { useContext, useEffect, useState } from 'react';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import Input from '@/components/lib/Input';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
import { EstablishmentTypeContext } from '@/contexts/api/EstablishmentTypeContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import styles from './EstablishmentCreationForm.module.scss';

export default function RegisterForm() {
  const { t } = useTranslation('establishment');
  // const navigate = useNavigate();
  const { post, isPostEstablishmentLoading } = useContext(EstablishmentContext);
  const { profile } = useContext(ProfileContext);
  const { establishmentTypes, isEstablishmentTypesLoading, get } = useContext(EstablishmentTypeContext);

  useEffect(() => {
    get();
  }, []);

  const [ emailInput, setEmailInput ] = useState({
    id: crypto.randomUUID(),
    name: 'email',
    value: '',
  });

  const [ establishmentTypeInput, setEstablishmentTypeInput ] = useState({
    id: crypto.randomUUID(),
    name: 'type',
    value: '',
  });

  const [ streetInput, setStreetInput ] = useState({
    id: crypto.randomUUID(),
    name: 'street',
    value: '',
  });

  const [ cityInput, setCityInput ] = useState({
    id: crypto.randomUUID(),
    name: 'city',
    value: '',
  });

  const [ zipCodeInput, setZipCodeInput ] = useState({
    id: crypto.randomUUID(),
    name: 'zipCode',
    value: '',
  });

  const [ countryInput, setCountryInput ] = useState({
    id: crypto.randomUUID(),
    name: 'country',
    value: '',
  });

  const handleEmailInputChange = (e) => {
    setEmailInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handleEstablishmentTypeInputChange = (e) => {
    setEstablishmentTypeInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handleStreetInputChange = (e) => {
    setStreetInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handleCityInputChange = (e) => {
    setCityInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handleZipCodeInputChange = (e) => {
    setZipCodeInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handleCountryInputChange = (e) => {
    setCountryInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      type: formData.get('type'),
      street: formData.get('street'),
      city: formData.get('city'),
      zipCode: formData.get('zipCode'),
      country: formData.get('country'),
      company: `/api/companies/${profile.company.id}`,
    };
    await post(data);
    // navigate('/backoffice/establishments');
  };

  return (
    <form className={styles.EstablishmentCreationForm} onSubmit={handleFormSubmit}>
      <div className={styles.EstablishmentCreationFormField}>
        <label htmlFor={emailInput.id} className={styles.EstablishmentCreationFormFieldLabel}>{t('form.email')} *</label>
        <Input
          id={emailInput.id}
          name={emailInput.name}
          placeholder={t('form.email')}
          disabled={isPostEstablishmentLoading}
          value={emailInput.value}
          onInput={handleEmailInputChange}
          required
        />
      </div>
      <div className={styles.EstablishmentCreationFormField}>
        <label htmlFor={streetInput.id} className={styles.EstablishmentCreationFormFieldLabel}>{t('form.street')} *</label>
        <Input
          id={streetInput.id}
          name={streetInput.name}
          placeholder={t('form.street')}
          disabled={isPostEstablishmentLoading}
          value={streetInput.value}
          onInput={handleStreetInputChange}
          required
        />
      </div>
      <div className={styles.EstablishmentCreationFormField}>
        <label htmlFor={cityInput.id} className={styles.EstablishmentCreationFormFieldLabel}>{t('form.city')} *</label>
        <Input
          id={cityInput.id}
          name={cityInput.name}
          placeholder={t('form.city')}
          disabled={isPostEstablishmentLoading}
          value={cityInput.value}
          onInput={handleCityInputChange}
          required
        />
      </div>
      <div className={styles.EstablishmentCreationFormField}>
        <label htmlFor={zipCodeInput.id} className={styles.EstablishmentCreationFormFieldLabel}>{t('form.zipCode')} *</label>
        <Input
          id={zipCodeInput.id}
          name={zipCodeInput.name}
          placeholder={t('form.zipCode')}
          disabled={isPostEstablishmentLoading}
          value={zipCodeInput.value}
          onInput={handleZipCodeInputChange}
          type="number"
          required
        />
      </div>
      <div className={styles.EstablishmentCreationFormField}>
        <label htmlFor={countryInput.id} className={styles.EstablishmentCreationFormFieldLabel}>{t('form.country')} *</label>
        <Input
          id={countryInput.id}
          name={countryInput.name}
          placeholder={t('form.country')}
          disabled={isPostEstablishmentLoading}
          value={countryInput.value}
          onInput={handleCountryInputChange}
          required
        />
      </div>
      { isEstablishmentTypesLoading && establishmentTypes.length === 0 && (
        <span>{t('form.establishmentTypeLoading')}</span>
      )}
      { !isEstablishmentTypesLoading && establishmentTypes.length > 0 && (
        <div className={styles.EstablishmentCreationFormField}>
          <label htmlFor={establishmentTypeInput.id} className={styles.EstablishmentCreationFormFieldLabel}>{t('form.establishmentType')} *</label>
          <select
            id={establishmentTypeInput.id}
            name={establishmentTypeInput.name}
            disabled={isPostEstablishmentLoading}
            value={establishmentTypeInput.value}
            onChange={handleEstablishmentTypeInputChange}
            required
          >
            {establishmentTypes.map(({ id, name }) => ({
              id: `api/establishment_types/${id}`,
              name,
            })).map((establishmentType) => (
              <option key={establishmentType.id} value={establishmentType.id}>{establishmentType.name}</option>
            ))}
          </select>
        </div>
      )}
      <Button type="submit" disabled={isPostEstablishmentLoading}>{t('form.actions.create')}</Button>
    </form>
  );
}
