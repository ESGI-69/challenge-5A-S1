import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Sidemenu from './Sidemenu';
import styles from './BackofficeLayout.module.scss';
import { Suspense } from 'react';

export default function BackofficeLayout() {
  return (
    <div className={styles.backoffice}>
      <Sidemenu className={styles.sidemenu} />
      <main className={styles.main}>
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
