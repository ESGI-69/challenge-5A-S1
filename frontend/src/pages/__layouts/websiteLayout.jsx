import PropTypes from 'prop-types';
import LanguageSwticher from '@/components/LanguageSwitcher';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function WebsiteLayout() {
  return (
    <>
      <header>
        <a href="/">Platiny</a>
        <LanguageSwticher />
      </header>
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
