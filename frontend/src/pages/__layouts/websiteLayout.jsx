import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

export default function WebsiteLayout() {
  return (
    <>
      <Header />
      <div>
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </div>
      <footer>Footer</footer>
    </>
  );
}

WebsiteLayout.propTypes = {
  children: PropTypes.node,
};
