import PropTypes from 'prop-types';

export default function Input({
  id,
  placeholder,
  type = 'text',

}) {

  // better way to handle css and var ?
  // https://vitejs.dev/guide/features.html#css-modules or https://styled-components.com/ ??
  const customStyle = {
    borderRadius: '4px',
    border: '1px solid var(--Text-regular, #272727)',
    padding: '4px 8px',
    fontSize: '14px',
  };

  return (
    <>
      <input
        style={customStyle}
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};
