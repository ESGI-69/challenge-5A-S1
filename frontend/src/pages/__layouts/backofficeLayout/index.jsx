import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Sidemenu from './Sidemenu';
import styles from './BackofficeLayout.module.scss';
import { Suspense } from 'react';
import { useContext, useEffect } from 'react';
import { ProfileContext } from '@/contexts/ProfileContext';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';

export default function BackofficeLayout() {
  const { profile } = useContext(ProfileContext);
  const { prestaGetById, company } = useContext(CompanyContext);
  const { get } = useContext(EstablishmentContext);

  useEffect(() => {
    if (profile && profile.roles.includes('ROLE_PRESTA')) {
      if (profile.company?.id) {
        if (!company) {
          console.log('get company');
          prestaGetById(profile.company.id);
        } else if (company.id) {
          console.log('get company establishments');
          get({ 'company.id': company.id });
        }
      }

    }
    // if (profile && profile.roles.includes('ROLE_ADMIN')) {
    //   console.log('admin');
    // }
  }, [ profile, company ]);

  return (
    <>
      { profile
        ? (
          <div className={styles.Backoffice}>
            <Sidemenu className={styles.BackofficeSidemenu} />
            <main className={styles.BackofficeMain}>
              <Suspense fallback="Loading...">
                <Outlet />
              </Suspense>
            </main>
          </div>
        )
        : (
          <span>Loading...</span>
        )
      }
    </>
  );
}

BackofficeLayout.propTypes = {
  children: PropTypes.node,
};
