import PropTypes from 'prop-types';
import styles from './OpeningHours.module.scss';
import { useTranslation } from 'react-i18next';

const OpeningHours = function OpeningHours({
  children,
},
) {
  const { t } = useTranslation('openingHours');

  const dateByDay = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  const dayNumberToString = {
    0: t('sunday'),
    1: t('monday'),
    2: t('tuesday'),
    3: t('wenesday'),
    4: t('thursday'),
    5: t('friday'),
    6: t('saturday'),
  };

  let tmpJson = JSON.parse(children);
  let currentDay = new Date().getDay();

  const dateTab = tmpJson.map(({ startTime, endTime })=>({
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  }));

  dateTab.forEach(el => {
    dateByDay[el.startTime.getDay()].push(el);
  });

  Object.keys(dateByDay).forEach((day) => {
    dateByDay[day].sort((a, b) => a.startTime - b.startTime);
  });

  return (
    <div className={styles.OpeningHours}>
      {
        Object.keys(dateByDay).map((day) => (
          <div className={`${styles.RowDay} ${currentDay!=day?'':styles.RowDayCurrentDay}`} key={day}>
            <span className={`${styles.DayArea} ${currentDay!=day?'':styles.DayAreaCurrentDay}`}>{dayNumberToString[day]} : </span>
            <span className={`${styles.HoursArea} ${currentDay!=day?'':styles.HoursAreaCurrentDay}`} key={day}>
              {
                dateByDay[day].length === 0 ? <div className={styles.HoursAreaClosed}>{t('closed')}</div> :
                  dateByDay[day].map(({ startTime, endTime }) => (
                    <div key={startTime}>{`${startTime.getHours()}:${startTime.getMinutes()}`} - {`${endTime.getHours()}:${endTime.getMinutes()}`}</div>
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
  children: PropTypes.node.isRequired,
};

export default OpeningHours;
