import style from './GlobalNotation.module.scss';
import Note from '@/components/Notation/Note';
import PropsType from 'prop-types';

function GlobalNotation({
  globalAverage = 0,
  subFeedbacks,
  reviewsCount = 0,
}) {
  return (
    <div className={style.GlobalNotation}>
      <div className={style.GlobalNotationTotalAverage}>
        {globalAverage}
      </div>
      <div className={style.GlobalNotationDetail}>

        {subFeedbacks?.map((subFeedback) => (
          <span
            key={subFeedback.id}
            className={style.GlobalNotationDetailItem}
          >
            {subFeedback.name}
            <Note value={subFeedback.average} className={style.GlobalNotationDetailItemAverage} />
          </span>
        ))}
        <span className={style.GlobalNotationCount}>
          {reviewsCount} clients ont donné leur avis
        </span>
      </div>
    </div>
  );
}

GlobalNotation.propTypes = {
  globalAverage: PropsType.number,
  subFeedbacks: PropsType.arrayOf(PropsType.shape({
    id: PropsType.number.isRequired,
    name: PropsType.string.isRequired,
    average: PropsType.number.isRequired,
  })),
  reviewsCount: PropsType.number,
};

export default GlobalNotation;
