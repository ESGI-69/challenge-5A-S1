import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Sidemenu from './Sidemenu';
import styles from './BackofficeLayout.module.scss';
import { Suspense } from 'react';

export default function BackofficeLayout() {
  return (
    <div className={styles.Backoffice}>
      <Sidemenu className={styles.BackofficeSidemenu} />
      <main className={styles.BackofficeMain}>
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

BackofficeLayout.propTypes = {
  children: PropTypes.node,
};
