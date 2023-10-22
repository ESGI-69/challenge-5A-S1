import PropTypes from 'prop-types';
import styles from '../assets/scss/button.module.scss';

export default function Button({
  title = 'Title',
  children,
  component: Component = 'button',
  variant = 'primary',
  onClick,
  style,
  ...others
}) {
  title = children ?? title;

  const variantClasses = {
    primary: 'button--primary',
    success: 'button--success',
    danger: 'button--danger',
    warning: 'button--warning',
  };
  const buttonClass = styles[variantClasses[variant]];

  return (
    <Component className={buttonClass} style={style} onClick={onClick} {...others}>
      {title}
    </Component>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  component: PropTypes.elementType,
  variant: PropTypes.oneOf([
    'primary',
    'success',
    'danger',
    'warning',
  ]),
  onClick: PropTypes.func,
  style: PropTypes.object,
};
