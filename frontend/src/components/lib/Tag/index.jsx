import PropTypes from 'prop-types';
import styles from './Tag.module.scss';

const Tag = function Tag(
  { children, variant = 'primary', ...delegated },
) {
  const variantClasses = {
    primary: 'tagPrimary',
    success: 'tagSuccess',
    danger: 'tagDanger',
    warning: 'tagWarning',
  };

  return (
    <span
      className={`${styles.tag} ${styles[variantClasses[variant]]}`}
      {...delegated}
    >
      {children}
    </span>
  );
};

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
