import styles from './CompanyRegister.module.scss';
import CompanyRegisterForm from './CompanyRegisterForm';
import CompanyProvider from '@/contexts/api/CompanyContext';
import { useTranslation } from 'react-i18next';
import sideImage from '@/assets/leaves.jpg';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

export default function CompanyRegister() {
  const { t } = useTranslation('companyRegister');
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate('/login');
    }
  }, [ profile, navigate ]);

  return (
    <div className={styles.Page}>
      <div className={styles.PageImage} style={{
        backgroundImage: `url(${sideImage})`,
      }}></div>
      <div className={styles.PageCompanyRegister}>
        <h1 className={styles.PageCompanyRegisterTitle}>{t('page.title')}</h1>
        <CompanyProvider>
          <CompanyRegisterForm />
        </CompanyProvider>
      </div>
    </div>
  );
}
