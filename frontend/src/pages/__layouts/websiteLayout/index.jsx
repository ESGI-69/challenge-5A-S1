import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import styles from './WebsiteLayout.module.scss';

export default function WebsiteLayout() {
  const { pathname } = useLocation();

  const fullPagePaths = [
    '/',
    '/login',
    '/register',
    '/search',
  ];

  const isFullPage = fullPagePaths.includes(pathname) ? styles.WebsiteLayoutFullPage : '';

  return (
    <div className={ `${styles.WebsiteLayout} ${isFullPage}` }>
      <Suspense fallback="Loading...">
        <Header />
        <div className={styles.WebsiteLayoutContent}>
          <Outlet />
        </div>
        <footer>Footer</footer>
      </Suspense>
    </div>
  );
}

WebsiteLayout.propTypes = {
  children: PropTypes.node,
};
