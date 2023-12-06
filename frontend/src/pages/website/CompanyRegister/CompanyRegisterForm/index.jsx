import { useContext, useState } from 'react';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import Input from '@/components/lib/Input';
import styles from './CompanyRegisterForm.module.scss';
import { useTranslation } from 'react-i18next';

export default function CompanyRegisterForm() {
  const { t } = useTranslation('companyRegister');
  return (
    <div>
      <h2>form</h2>
      <p>{t('form.test')}</p>
    </div>
  );
}
