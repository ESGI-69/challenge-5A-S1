import styles from './CompanyRegister.module.scss';
import CompanyRegisterForm from './CompanyRegisterForm';
import CompanyProvider from '@/contexts/api/CompanyContext';
import { useTranslation } from 'react-i18next';
import sideImage from '@/assets/leaves.jpg';

export default function CompanyRegister() {
  const { t } = useTranslation('companyRegister');

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
