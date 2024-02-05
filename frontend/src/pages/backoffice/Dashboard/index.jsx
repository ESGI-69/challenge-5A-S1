import BackofficeHeader from '@/components/BackofficeHeader';
import Button from '@/components/lib/Button';
import { useContext } from 'react';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const { company, isCompanyLoading } = useContext(CompanyContext);
  const { profile } = useContext(ProfileContext);
  const { isEstablishmentsLoading, establishments } = useContext(EstablishmentContext);

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
      { userHighestRole === 'ROLE_ADMIN' && (
        <>
          <BackofficeHeader actionsComponent={<Button to='/'>{t('backToUserLand')}</Button>}>
            <h1>{t('title')} admin</h1>
          </BackofficeHeader>
          <p>Se tableau le bord</p>
        </>
      )}
      { userHighestRole === 'ROLE_PRESTA' && (
        <>
          <BackofficeHeader actionsComponent={<Button to='/'>{t('backToUserLand')}</Button>}>
            <h1>{t('title')} { company && ` - ${company.name}`}</h1>
          </BackofficeHeader>
          { isEstablishmentsLoading || isCompanyLoading && (<span>{t('loading', { ns: 'base' })}...</span>)}
          { !isCompanyLoading && !isEstablishmentsLoading && (
            <>
              <p>{t('presta.ownedEstablishments', { count: establishments.length })}</p>
              <ul>
                {establishments.map((establishment) => (
                  <li key={establishment.id}>
                    {establishment.city} - {establishment.street} - <Link style={{ all: 'revert' }} to={`/backoffice/establishments/${establishment.id}`}>Voir</Link>
                  </li>
                ))}
              </ul>
              <Button to="/backoffice/establishments/create">{t('presta.addEstablishment')}</Button>
            </>
          )}
        </>
      )}
    </>
  );
}
