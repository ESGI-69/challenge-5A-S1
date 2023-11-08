import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import styles from './WebsiteLayout.module.scss';

export default function WebsiteLayout() {
  return (
    <div className={ styles.WebsiteLayout }>
      <Suspense fallback="Loading...">
        <Header />
        <Outlet />
        <footer>Footer</footer>
      </Suspense>
    </div>
  );
}

WebsiteLayout.propTypes = {
  children: PropTypes.node,
};
