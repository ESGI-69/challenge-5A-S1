import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import React from 'react';

const Button = React.forwardRef(function Button(
  { children, href, variant = 'primary', ...delegated },
  ref,
) {
  const variantClasses = {
    primary: 'button--primary',
    success: 'button--success',
    danger: 'button--danger',
    warning: 'button--warning',
  };
  const Element = href ? 'a' : 'button';
  return (
    <Element ref={ref} href={href} className={`${styles.button} ${styles[variantClasses[variant]]}`} {...delegated}>
      {children}
    </Element>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'success',
    'danger',
    'warning',
  ]),
  style: PropTypes.object,
};

export default Button;
