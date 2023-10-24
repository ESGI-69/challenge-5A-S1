import PropTypes from 'prop-types';
import LanguageSwticher from '@/components/LanguageSwitcher';
import { Suspense } from 'react';

export default function WebsiteLayout({ children }) {
  return (
    <>
      <header>
        <a href="/">Platiny</a>
        <LanguageSwticher />
      </header>
      <div>
        <Suspense fallback="Loading...">
          {children}
        </Suspense>
      </div>
      <footer>Footer</footer>
    </>
  );
}

WebsiteLayout.propTypes = {
  children: PropTypes.node,
};
