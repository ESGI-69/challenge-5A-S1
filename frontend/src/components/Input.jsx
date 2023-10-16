import PropTypes from 'prop-types';

export default function Input({
  id,
  placeholder,
  type = 'text',

}) {


  return (
    <>
      <input
        // style={customStyle}
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
