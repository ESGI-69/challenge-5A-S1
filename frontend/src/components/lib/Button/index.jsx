import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import React from 'react';

const Button = React.forwardRef(function Button(
  {
    children,
    href,
    variant = 'primary',
    size = 'default',
    ...delegated
  },
  ref,
) {
  const variantClasses = {
    primary: styles.ButtonPrimary,
    secondary: styles.ButtonSecondary,
    success: styles.ButtonSuccess,
    danger: styles.ButtonDanger,
    warning: styles.ButtonWarning,
    black: styles.ButtonBlack,
  };
  const Element = href ? 'a' : 'button';
  return (
    <Element ref={ref} href={href} className={`${styles.Button} ${variantClasses[variant]} ${size === 'large' && styles.ButtonLarge}`} {...delegated}>
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
  size: PropTypes.oneOf([ 'default', 'large' ]),
  style: PropTypes.object,
};

export default Button;
