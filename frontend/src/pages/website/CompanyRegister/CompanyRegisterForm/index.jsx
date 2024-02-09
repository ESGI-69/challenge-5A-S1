import { useContext, useState } from 'react';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import Input from '@/components/lib/Input';
import styles from './CompanyRegisterForm.module.scss';
import { useTranslation } from 'react-i18next';
import Button from '@/components/lib/Button';
import { v4 } from 'uuid';

export default function CompanyRegisterForm() {
  const { t } = useTranslation('companyRegister');
  const Company = useContext(CompanyContext);
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ success, setSuccess ] = useState(false);

  const [ nameInput, setNameInput ] = useState({
    id: v4(),
    name: 'name',
    value: '',
  });

  const [ emailInput, setEmailInput ] = useState({
    id: v4(),
    name: 'email',
    value: '',
  });

  const [ fileKbisInput, setfileKbisInput ] = useState({
    id: v4(),
    name: 'fileKbis',
    value: '',
  });

  const [ fileLogo, setfileLogo ] = useState({
    id: v4(),
    name: 'fileLogo',
    value: '',
  });

  const handleNameInputChange = (e) => {
    setNameInput((old) => ({
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

  const handlefileKbisInputChange = (e) => {
    setfileKbisInput((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const handlefileLogoInputChange = (e) => {
    setfileLogo((old) => ({
      ...old,
      value: e.target.value,
    }));
  };

  const resetFields = () => {
    setNameInput(old => ({ ...old, value: '' }));
    setEmailInput(old => ({ ...old, value: '' }));
    setfileKbisInput(old => ({ ...old, value: '' }));
    setfileLogo(old => ({ ...old, value: '' }));
  };

  const handleSubmit = async (e) => {
    setError(false);
    setSuccess(false);

    e.preventDefault();
    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('email', e.target.email.value);

    if (e.target.fileKbis.files[0]) {
      formData.append('fileKbis', e.target.fileKbis.files[0]);
    }

    if (e.target.fileLogo.files[0]) {
      formData.append('fileLogo', e.target.fileLogo.files[0]);
    }

    try {
      await Company.post(formData);
      setSuccess(true);
      resetFields();
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={nameInput.id}>{t('form.name')} *</label>
        <Input
          id={nameInput.id}
          name={nameInput.name}
          placeholder={t('form.name')}
          disabled={Company.isCompanyLoading}
          value={nameInput.value}
          onInput={handleNameInputChange}
          required
        />
      </div>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={emailInput.id}>{t('form.email')} *</label>
        <Input
          id={emailInput.id}
          name={emailInput.name}
          type="email"
          placeholder={t('form.email')}
          disabled={Company.isCompanyLoading}
          value={emailInput.value}
          onInput={handleEmailInputChange}
          required
        />
      </div>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={fileKbisInput.id}>{t('form.fileKbis')} *</label>
        <Input
          id={fileKbisInput.id}
          name={fileKbisInput.name}
          type="file"
          accept="application/pdf"
          placeholder={t('form.fileKbis')}
          disabled={Company.isCompanyLoading}
          value={fileKbisInput.value}
          onInput={handlefileKbisInputChange}
          required
        />
      </div>
      <div className={styles.FormField}>
        <label className={styles.FormFieldLabel} htmlFor={fileLogo.id}>{t('form.fileLogo')} *</label>
        <Input
          id={fileLogo.id}
          name={fileLogo.name}
          type="file"
          accept="image/*"
          placeholder={t('form.fileLogo')}
          disabled={Company.isCompanyLoading}
          value={fileLogo.value}
          onInput={handlefileLogoInputChange}
          required
        />
      </div>
      {error && <p className={styles.FormError}>{errorMessage}</p>}
      {success && <p className={styles.FormSuccess}>{t('form.success')}</p>}
      <Button type="submit" variant="black" disabled={Company.isCompanyLoading}>{t('form.submit')}</Button>
    </form>
  );
}
