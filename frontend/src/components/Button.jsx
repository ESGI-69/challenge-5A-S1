import PropTypes from 'prop-types';
import styles from '../assets/scss/button.module.scss';

export default function Button({
  children,
  component: Component = 'button',
  variant = 'primary',
  ...others
}) {

  const variantClasses = {
    primary: 'button--primary',
    success: 'button--success',
    danger: 'button--danger',
    warning: 'button--warning',
  };
  const buttonClass = styles[variantClasses[variant]];

  return (
    <Component className={buttonClass} {...others}>
      {children}
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
  variant: PropTypes.oneOf([
    'primary',
    'success',
    'danger',
    'warning',
  ]),
  style: PropTypes.object,
};
