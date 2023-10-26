import style from './Note.module.scss';
import Star from '@/components/lib/Icons/Star';
import PropTypes from 'prop-types';
import { addDigit } from '@/utils/formater/note';

function Note({
  value,
  ...delegated
}) {
  return (
    <span className={style.Note} {...delegated}>
      {addDigit(value)} <Star />
    </span>
  );
}

Note.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Note;
