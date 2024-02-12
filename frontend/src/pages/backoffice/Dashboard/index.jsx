import BackofficeHeader from '@/components/BackofficeHeader';
import Button from '@/components/lib/Button';
import { useContext } from 'react';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useTranslation } from 'react-i18next';
import CompanyStatisticsProvider from '@/contexts/api/CompanyStatisticsContext';
import Statistics from './Statistics';

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const { company, isCompanyLoading } = useContext(CompanyContext);
  const { profile } = useContext(ProfileContext);

  const userHighestRole = profile.roles.reduce((acc, role) => {
    if (role === 'ROLE_ADMIN') {
      return role;
    }
    if (role === 'ROLE_PRESTA') {
      return role;
    }
    return acc;
  });

  return (
    <>
      {userHighestRole === 'ROLE_ADMIN' && (
        <>
          <BackofficeHeader actionsComponent={<Button to='/'>{t('backToUserLand')}</Button>}>
            <h1>{t('title')} admin</h1>
          </BackofficeHeader>
          <p>Se tableau le bord</p>
        </>
      )}
      {userHighestRole === 'ROLE_PRESTA' && (
        <>
          <BackofficeHeader actionsComponent={<Button to='/'>{t('backToUserLand')}</Button>}>
            <h1>{t('title')} {company && ` - ${company.name}`}</h1>
          </BackofficeHeader>
          {isCompanyLoading && (<span>{t('loading', { ns: 'base' })}...</span>)}
          {!isCompanyLoading && company && (
            <>
              <CompanyStatisticsProvider>
                <Statistics companyId={company.id} />
              </CompanyStatisticsProvider>
            </>
          )}
        </>
      )}
    </>
  );
}
