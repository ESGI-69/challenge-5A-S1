import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import React from 'react';

const Button = React.forwardRef(function Button(
  { children, href, variant = 'primary', ...delegated },
  ref,
) {
  const variantClasses = {
    primary: 'ButtonPrimary',
    secondary: 'ButtonSecondary',
    success: 'ButtonSuccess',
    danger: 'ButtonDanger',
    warning: 'ButtonWarning',
    black: 'ButtonBlack',
  };
  const Element = href ? 'a' : 'button';
  return (
    <Element ref={ref} href={href} className={`${styles.Button} ${styles[variantClasses[variant]]}`} {...delegated}>
      {children}
    </Element>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'black',
  ]),
  style: PropTypes.object,
};

export default Button;
