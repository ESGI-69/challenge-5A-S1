import { forwardRef, useState } from 'react';
import styles from './Input.module.css';

function Input({
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

  return (
    <input
      className={styles.input}
      value={value}
      onChange={handleChange}
      type="text"
      ref={ref}
      {...delegated}
    />
  );
}

export default forwardRef(Input);
