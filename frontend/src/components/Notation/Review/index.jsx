import style from './Review.module.scss';
import Note from '@/components/Notation/Note';

function Review() {
  return (
    <div className={style.SingleNotation}>
      <div className={style.SingleNotationHeader}>
        <span className={style.SingleNotationHeaderAuthor}>
          Jean
        </span>
        <Note value={4} />
      </div>
      <div className={style.SingleNotationContent}>
        Blibla blou
      </div>
      <span className={style.SingleNotationDate}>
        12/12/2021
      </span>
    </div>
  );
}

export default Review;
