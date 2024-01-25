import BackofficeHeader from '@/components/BackofficeHeader';
import Button from '@/components/lib/Button';
import { useContext } from 'react';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';

export default function Dashboard() {
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
          <BackofficeHeader actionsComponent={<Button>Lorem le ipsum</Button>}>
            <h1>Tableau de bord admin</h1>
          </BackofficeHeader>
          <p>Se tableau le bord</p>
        </>
      )}
      { userHighestRole === 'ROLE_PRESTA' && (
        <>
          <BackofficeHeader actionsComponent={<Button>Lorem le ipsum</Button>}>
            <h1>Tableau de bord { company && ` - ${company.name}`}</h1>
          </BackofficeHeader>
          { isEstablishmentsLoading || isCompanyLoading && (<span>Loading...</span>)}
          { !isCompanyLoading && !isEstablishmentsLoading && (
            <>
              { establishments.length === 0 && (
                <>
                  <p>Vous n avez pas encore d établissement</p>
                  <Button to="/backoffice/establishments/create">Ajouter un établissement</Button>
                </>
              )}
              { establishments.length > 0 && (
                <>
                  <p>Vous avez {establishments.length} établissement{establishments.length > 1 && 's'}</p>
                  <ul>
                    {establishments.map((establishment) => (
                      <li key={establishment.id}>
                        {establishment.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
