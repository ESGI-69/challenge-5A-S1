import { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from '@/contexts/api/EmployeeContext';
import Input from '@/components/lib/Input';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '@/contexts/ProfileContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import styles from './EmployeeCreationForm.module.scss';
import crypto from 'crypto';

export default function RegisterForm() {
  const { t } = useTranslation('employee');
  const navigate = useNavigate();
  const { post, isPostEmployeeLoading } = useContext(EmployeeContext);
  const { profile } = useContext(ProfileContext);
  const { establishments, isEstablishmentsLoading, get } = useContext(EstablishmentContext);

  useEffect(() => {
    get({ 'company.id': profile.company.id });
  }, []);

  const [ firstnameInput, setFirstnameInput ] = useState({
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
    name: 'lastname',
    value: '',
  });

  const handleLastnameInputChange = (e) => {
    setLastnameInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const [ avatarInput, setAvatarInput ] = useState({
    id: crypto.randomUUID(),
    name: 'avatar',
    value: '',
  });

  const handleAvatarInputChange = (e) => {
    setAvatarInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const [ preferedEstablishmentInput, setPreferedEstablishmentInput ] = useState({
    id: crypto.randomUUID(),
    name: 'preferedEstablishment',
    value: '',
  });

  const handlePreferedEstablishmentInputChange = (e) => {
    setPreferedEstablishmentInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      companyId: `/api/companies/${profile.company.id}`,
      avatar: formData.get('avatar'),
      preferedEstablishment: formData.get('preferedEstablishment'),
    };
    await post(data);
    navigate('/backoffice/employees');
  };

  return (
    <form className={styles.EmployeeCreationForm} onSubmit={handleFormSubmit}>
      <div className={styles.EmployeeCreationFormField}>
        <label htmlFor={firstnameInput.id} className={styles.EmployeeCreationFormFieldLabel}>{t('form.firstname')} *</label>
        <Input
          id={firstnameInput.id}
          name={firstnameInput.name}
          placeholder={t('form.firstname')}
          disabled={isPostEmployeeLoading}
          value={firstnameInput.value}
          onInput={handleFirstnameInputChange}
          required
        />
      </div>
      <div className={styles.EmployeeCreationFormField}>
        <label htmlFor={lastnameInput.id} className={styles.EmployeeCreationFormFieldLabel}>{t('form.lastname')} *</label>
        <Input
          id={lastnameInput.id}
          name={lastnameInput.name}
          placeholder={t('form.lastname')}
          disabled={isPostEmployeeLoading}
          value={lastnameInput.value}
          onInput={handleLastnameInputChange}
          required
        />
      </div>
      <div className={styles.EmployeeCreationFormField}>
        <label htmlFor={avatarInput.id} className={styles.EmployeeCreationFormFieldLabel}>{t('form.avatar')} *</label>
        <Input
          id={avatarInput.id}
          name={avatarInput.name}
          placeholder={t('form.avatar')}
          disabled={isPostEmployeeLoading}
          value={avatarInput.value}
          onInput={handleAvatarInputChange}
          required
        />
      </div>
      { isEstablishmentsLoading && establishments.length === 0 && (
        <span>{t('form.establishmentsLoading')}</span>
      )}
      { !isEstablishmentsLoading && establishments.length > 0 && (
        <div className={styles.EstablishmentCreationFormField}>
          <label htmlFor={preferedEstablishmentInput.id} className={styles.EmployeeCreationFormFieldLabel}>{t('form.preferedEstablishment')} *</label>
          <select
            id={preferedEstablishmentInput.id}
            name={preferedEstablishmentInput.name}
            disabled={isPostEmployeeLoading}
            value={preferedEstablishmentInput.value}
            onChange={handlePreferedEstablishmentInputChange}
            required
          >
            {establishments.map(({ id, city, street }) => ({
              id: `api/establishments/${id}`,
              city,
              street,
            })).map((establishment) => (
              <option key={establishment.id} value={establishment.id}>{establishment.street} - {establishment.city}</option>
            ))}
          </select>
        </div>
      )}
      <Button type="submit" disabled={isPostEmployeeLoading}>{t('form.actions.create')}</Button>
    </form>
  );
}
