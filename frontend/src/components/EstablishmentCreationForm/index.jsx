import { useContext, useEffect, useState } from 'react';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import Input from '@/components/lib/Input';
import Button from '@/components/lib/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EstablishmentTypeContext } from '@/contexts/api/EstablishmentTypeContext';

export default function RegisterForm() {
  const { t } = useTranslation('establishment');
  const navigate = useNavigate();
  const { post, isPostEstablishmentLoading } = useContext(EstablishmentContext);
  const { establishmentTypes, isEstablishmentTypesLoading, get } = useContext(EstablishmentTypeContext);

  useEffect(() => {
    get();
  }, []);

  const [ emailInput, setEmailInput ] = useState({
    id: crypto.randomUUID(),
    name: 'firstname',
    value: '',
  });

  const [ establishmentTypeInput, setEstablishmentTypeInput ] = useState({
    id: crypto.randomUUID(),
    name: 'establishment_type',
    value: '',
  });

  const handleFirstnameInputChange = (e) => {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      firstname: formData.get('firstname'),
    };
    console.log(data);
    // await post(data);
    // navigate('/backoffice/establishments');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor={emailInput.id}>{t('form.email')} *</label>
        <Input
          id={emailInput.id}
          name={emailInput.name}
          placeholder={t('form.email')}
          disabled={isPostEstablishmentLoading}
          value={emailInput.value}
          onInput={handleFirstnameInputChange}
          required
        />
      </div>
      { isEstablishmentTypesLoading && establishmentTypes.length === 0 && (
        <span>{t('form.establishmentTypeLoading')}</span>
      )}
      { !isEstablishmentTypesLoading && establishmentTypes.length > 0 && (
        <div>
          <label htmlFor={establishmentTypeInput.id}>{t('form.establishmentType')} *</label>
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
