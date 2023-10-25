import PropTypes from 'prop-types';
import styles from './Tag.module.css';
import React from 'react';

const Tag = React.forwardRef(function Tag(
  { children, variant = 'primary', ...delegated },
  ref,
) {
  const variantClasses = {
    primary: 'tag--primary',
    success: 'tag--success',
    danger: 'tag--danger',
    warning: 'tag--warning',
  };

  return (
    <span
      className={`${styles.tag} ${styles[variantClasses[variant]]}`}
      ref={ref}
      {...delegated}
    >
      {children}
    </span>
  );
});

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary', 
    'success', 
    'danger', 
    'warning',
  ]),
  styles: PropTypes.object,
};

export default Tag;