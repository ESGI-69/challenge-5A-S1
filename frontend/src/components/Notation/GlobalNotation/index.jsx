import style from './GlobalNotation.module.scss';
import Note from '@/components/Notation/Note';

function GlobalNotation() {
  return (
    <div className={style.GlobalNotation}>
      <div className={style.GlobalNotationTotalAverage}>
        4,2
      </div>
      <div className={style.GlobalNotationDetail}>
        <span className={style.GlobalNotationDetailItem}>
          Accueil
          <Note value={4} className={style.GlobalNotationDetailItemAverage} />
        </span>
        <span className={style.GlobalNotationDetailItem}>
          Propreté
          <Note value={4} className={style.GlobalNotationDetailItemAverage} />
        </span>
        <span className={style.GlobalNotationDetailItem}>
          Cadre & Ambiance
          <Note value={4} className={style.GlobalNotationDetailItemAverage} />
        </span>
        <span className={style.GlobalNotationDetailItem}>
          Qualité de la prestation
          <Note value={4} className={style.GlobalNotationDetailItemAverage} />
        </span>
        <span className={style.GlobalNotationCount}>
          315 clients ont donné leur avis
        </span>
      </div>
    </div>
  );
}

export default GlobalNotation;
