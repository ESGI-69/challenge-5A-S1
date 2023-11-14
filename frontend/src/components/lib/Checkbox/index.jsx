import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.scss';

const STATES = {
  0: 'UNCHECKED',
  1: 'CHECKED',
  2: 'PARTIAL',
};

const Checkbox = forwardRef(function CheckboxComponent({ value, onChange, ...delegated }, ref) {
  const [ checkboxState, setCheckboxState ] = useState(() => value);

  useEffect(() => (
    setCheckboxState(STATES[value + 0])
  ), [ value ]);

  const checkedStyles = {
    [STATES[0]]: styles.CheckboxBox_Unchecked,
    [STATES[1]]: styles.CheckboxBox_Checked,
    [STATES[2]]: styles.CheckboxBox_Partial,
  };

  const handleChange = (e) => {
    setCheckboxState(STATES[e.target.checked + 0]);
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className={styles.Checkbox}>
      <div className={`${styles.CheckboxBox} ${checkedStyles[checkboxState]}`}></div>
      <input
        className={styles.CheckboxInput}
        ref={ref}
        type="checkbox"
        checked={value}
        onChange={handleChange}
        {...delegated}
      />
    </label>
  );
});

Checkbox.propTypes = {
  value: PropTypes.bool || PropTypes.number,
  onChange: PropTypes.func,
};

export default Checkbox;
