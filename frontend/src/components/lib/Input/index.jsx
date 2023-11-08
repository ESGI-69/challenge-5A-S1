import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import styles from './Input.module.scss';

const Input = forwardRef(function InputComponent({
  onChange,
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

  Input.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
  };

  return (
    <input
      className={styles.Input}
      value={value}
      onChange={handleChange}
      type="text"
      ref={ref}
      {...delegated}
    />
  );
});

export default Input;
