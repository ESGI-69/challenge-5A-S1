import style from './Review.module.scss';
import Note from '@/components/Notation/Note';
import PropsType from 'prop-types';
import { dayMonthYearNumber } from '@/utils/formater/date';

function Review({
  authorName,
  note,
  date,
  content,
}) {
  return (
    <div className={style.Review}>
      <div className={style.ReviewHeader}>
        <Note value={note} />
        <span className={style.ReviewHeaderAuthor}>
          - {authorName}
        </span>
      </div>
      <div className={style.ReviewContent}>
        {content}
      </div>
      <span className={style.ReviewDate}>
        {dayMonthYearNumber(date)}
      </span>
    </div>
  );
}

Review.propTypes = {
  authorName: PropsType.string.isRequired,
  date: PropsType.string.isRequired,
  content: PropsType.string,
  note: PropsType.number.isRequired,
};

export default Review;
