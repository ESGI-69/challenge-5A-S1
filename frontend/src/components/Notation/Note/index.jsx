import style from './Note.module.scss';
import Star from '@/components/lib/Icons/Star';
import PropTypes from 'prop-types';

function Note({
  value,
  ...delegated
}) {
  return (
    <span className={style.Note} {...delegated}>
      {value.toString().replace('.', ',')} <Star />
    </span>
  );
}

Note.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Note;
