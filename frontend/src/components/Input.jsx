import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Input({
  id,
  placeholder,
  type = 'text',
  onChange,
}) {

  const [ value, setValue ] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // better way to handle css and var ?
  // https://vitejs.dev/guide/features.html#css-modules or https://styled-components.com/ ??
  const customStyle = {
    borderRadius: '0.25rem',
    border: '1px solid var(--Text-regular, #272727)',
    padding: '0.25rem 0.5rem',
    fontSize: '14px',
  };

  return (
    <>
      <input
        style={customStyle}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};
