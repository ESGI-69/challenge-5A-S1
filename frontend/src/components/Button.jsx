import PropTypes from 'prop-types';

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
  let buttonClasses = '';

  switch (variant) {
    case 'primary':
      buttonClasses = 'button--primary';
      break;
    case 'success':
      buttonClasses = 'button--success';
      break;
    case 'danger':
      buttonClasses = 'button--danger';
      break;
    case 'warning':
      buttonClasses = 'button--warning';
      break;
  }

  let customStyle = {

  };

  Object.assign(customStyle, style);

  return (
    <Component className={buttonClasses} style={customStyle} onClick={onClick} {...others}>
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
