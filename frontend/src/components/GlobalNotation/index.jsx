import style from './GlobalNotation.module.scss';

function GlobalNotation() {
  return (
    <div className={style.GlobalNotation}>
      <div className={style.GlobalNotationTotalAverage}>
        4,2
      </div>
      <div className={style.GlobalNotationDetail}>
        <span className={style.GlobalNotationDetailItem}>
            Accueil
          <span className={style.GlobalNotationDetailItemAverage}>
            4,2
          </span>
        </span>
        <span className={style.GlobalNotationDetailItem}>
            Propreté
          <span className={style.GlobalNotationDetailItemAverage}>
            4,2
          </span>
        </span>
        <span className={style.GlobalNotationDetailItem}>
            Cadre & Ambiance
          <span className={style.GlobalNotationDetailItemAverage}>
            4,2
          </span>
        </span>
        <span className={style.GlobalNotationDetailItem}>
            Qualité de la prestation
          <span className={style.GlobalNotationDetailItemAverage}>
            4,2
          </span>
        </span>
        <span className={style.GlobalNotationCount}>
          315 clients ont donné leur avis
        </span>
      </div>
    </div>
  );
}

export default GlobalNotation;
