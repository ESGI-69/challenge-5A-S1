import React from 'react';
import PropTypes from 'prop-types';
import styles from './Popin.module.scss';
import Button from '../lib/Button';

const Popin = React.forwardRef(function Popin(
  { children, onClose, ...delegated },
  ref,
) {
  return (
    <div ref={ref} className={styles.Popin} {...delegated}>
      <div className={styles.PopinContent}>
        <div className={styles.PopinClose}>
          <Button variant="danger" onClick={onClose}>X</Button>
        </div>
        {children}
      </div>
    </div>
  );
});

Popin.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Popin;
