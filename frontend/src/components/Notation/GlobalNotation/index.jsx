import style from './GlobalNotation.module.scss';
import Note from '@/components/Notation/Note';
import PropsType from 'prop-types';
import { addDigit } from '@/utils/formater/note';

function GlobalNotation({
  globalAverage = 0,
  subFeedbacks,
  reviewsCount = 0,
}) {
  return (
    <div className={style.GlobalNotation}>
      <div className={style.GlobalNotationTotalAverage}>
        {addDigit(globalAverage)}
      </div>
      <div className={style.GlobalNotationDetail}>

        {subFeedbacks?.map((subFeedback) => (
          <span
            key={subFeedback.id}
            className={style.GlobalNotationDetailItem}
          >
            {subFeedback.name}
            <Note value={subFeedback.averageNotation ?? 0} className={style.GlobalNotationDetailItemAverage} />
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
  globalAverage: PropsType.string,
  subFeedbacks: PropsType.arrayOf(PropsType.shape({
    id: PropsType.number.isRequired,
    name: PropsType.string.isRequired,
    averageNotation: PropsType.number || PropsType.string,
  })),
  reviewsCount: PropsType.number,
};

export default GlobalNotation;
