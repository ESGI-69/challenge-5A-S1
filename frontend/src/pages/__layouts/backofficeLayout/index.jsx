import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Sidemenu from './Sidemenu';
import styles from './BackofficeLayout.module.scss';

export default function BackofficeLayout() {
  return (
    <div className={styles.backoffice}>
      <Sidemenu className={styles.sidemenu}/>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

BackofficeLayout.propTypes = {
  children: PropTypes.node,
};
