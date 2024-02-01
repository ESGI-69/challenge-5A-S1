import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Button = React.forwardRef(function Button(
  {
    children,
    to,
    variant = 'primary',
    size = 'default',
    isPlain = false,
    disabled = false,
    ...delegated
  },
  ref,
) {
  const variantClassesSelector = () => {
    variant = variant.charAt(0).toUpperCase() + variant.slice(1);

    if (isPlain) {
      return `${styles[`Button${variant}`]} ${styles[`Button${variant}Plain`]}`;
    }
    return styles[`Button${variant}`];
  };

  const Element = to ? Link : 'button';

  return (
    <Element
      ref={ref}
      to={to}
      className={`
        ${styles.Button}
        ${variantClassesSelector()}
        ${size === 'large' && styles.ButtonLarge}
        ${size === 'small' && styles.ButtonSmall}
        ${disabled && styles.ButtonDisabled}
      `}
      disabled={disabled}
      {...delegated}
    >
      {children}
    </Element>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'black',
  ]),
  size: PropTypes.oneOf([ 'default', 'large' ]),
  isPlain: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

export default Button;
