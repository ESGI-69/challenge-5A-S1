import PropTypes from 'prop-types';
import styles from './Tag.module.scss';

const Tag = function Tag(
  { children, variant = 'primary', ...delegated },
) {
  const variantClasses = {
    primary: 'TagPrimary',
    success: 'TagSuccess',
    danger: 'TagDanger',
    warning: 'TagWarning',
  };

  return (
    <span
      className={`${styles.Tag} ${styles[variantClasses[variant]]}`}
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
