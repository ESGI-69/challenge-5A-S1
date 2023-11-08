import PropTypes from 'prop-types';
import styles from './BackofficeHeader.module.scss';

export default function BackofficeHeader({ children, actionsComponent }) {

  return (
    <header className={styles.Header}>
      <div>{children}</div>
      <div>{actionsComponent}</div>
    </header>
  );
}

BackofficeHeader.propTypes = {
  children: PropTypes.node,
  actionsComponent: PropTypes.node,
};
