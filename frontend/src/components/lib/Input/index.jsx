import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import styles from './Input.module.scss';

const Input = forwardRef(function InputComponent({
  onChange,
  variant = 'default',
  disabled = false,
  onEnterPressed,
  ...delegated
}, ref) {
  const [ value, setValue ] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyPress = (event) => {
    if (event. keyCode === 13 && onEnterPressed) {
      onEnterPressed();
    }
  };

  const classNameVariant = {
    default: styles.Input,
    'no-border': `${styles.InputNoBorder} ${styles.Input}`,
  };

  return (
    <input
      className={classNameVariant[variant]}
      value={value}
      onChange={handleChange}
      type="text"
      disabled={disabled}
      ref={ref}
      onKeyUp={handleKeyPress}
      {...delegated}
    />
  );
});

Input.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf([ 'default', 'no-border' ]),
  disabled: PropTypes.bool,
  onEnterPressed: PropTypes.func,
};

export default Input;
