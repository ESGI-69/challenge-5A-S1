import PropTypes from 'prop-types';
import styles from './OpeningHours.module.scss';
import { useTranslation } from 'react-i18next';

const OpeningHours = function OpeningHours({
  value,
},
) {
  const { t } = useTranslation('openingHours');

  const openingDays = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  value.forEach((oppeningHour) => {
    openingDays[oppeningHour.day].push({
      startTime: new Date(oppeningHour.startTime),
      endTime: new Date(oppeningHour.endTime),
    });
  });

  let currentDay = new Date().getDay();

  return (
    <div className={styles.OpeningHours}>
      {
        Object.entries(openingDays).map(([ day, oppeningHours ]) => (
          <div className={`${styles.RowDay} ${currentDay !== day ? '' : styles.RowDayCurrentDay}`} key={day}>
            <span className={`${styles.DayArea} ${currentDay !== day ? '' : styles.DayAreaCurrentDay}`}>{t(`weekDays.${day}`, { ns: 'base' })} : </span>
            <span className={`${styles.HoursArea} ${currentDay !== day ? '' : styles.HoursAreaCurrentDay}`} key={day}>
              {
                oppeningHours.length === 0
                  ? <div className={styles.HoursAreaClosed}>{t('closed')}</div>
                  : oppeningHours.map(({ startTime, endTime }) => (
                    <div key={startTime}>{`${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padEnd(2, '0')}`} - {`${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padEnd(2, '0')}`}</div>
                  ))
              }
            </span>
          </div>
        ))
      }
    </div>
  );
};

OpeningHours.propTypes = {
  value: PropTypes.array.isRequired,
};

export default OpeningHours;
