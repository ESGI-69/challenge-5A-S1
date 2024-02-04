import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './OpeningHoursSelector.module.scss';
import Button from '../lib/Button';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';

export default function OpeningHoursSelector() {
  const { t } = useTranslation('base');
  const { getById, isEstablishmentLoading, postOpeningHour, establishment, patchOpeningHour, isPostOpeningHourLoading, isPatchOpeningHourLoading } = useContext(EstablishmentContext);
  const [ openingHours, setOpeningHours ] = useState({
    monday: {
      day: 'monday',
      from: '',
      to: '',
    },
    tuesday: {
      day: 'tuesday',
      from: '',
      to: '',
    },
    wednesday: {
      day: 'wednesday',
      from: '',
      to: '',
    },
    thursday: {
      day: 'thursday',
      from: '',
      to: '',
    },
    friday: {
      day: 'friday',
      from: '',
      to: '',
    },
    saturday: {
      day: 'saturday',
      from: '',
      to: '',
    },
    sunday: {
      day: 'sunday',
      from: '',
      to: '',
    },
  });

  useEffect(() => {
    establishment.openingHours.forEach((hour) => {
      setOpeningHours((old) => ({
        ...old,
        [hour.day]: {
          from: `${hour.startTime.split('T')[1].split(':')[0]  }:${  hour.startTime.split('T')[1].split(':')[1]}`,
          to: `${hour.endTime.split('T')[1].split(':')[0]  }:${  hour.endTime.split('T')[1].split(':')[1]}`,
          id: hour.id || undefined,
        },
      }));
      if (!openingDays.includes(hour.day)) setOpeningDays((old) => [ ...old, hour.day ]);
    });
  }, [ establishment.openingHours ]);

  const [ openingDays, setOpeningDays ] = useState([]);

  const sendRequest = async () => {
    console.log(establishment);
    const promiseArray = [];
    openingDays.forEach((day) => {
      if (!openingHours[day].id) {
        promiseArray.push(postOpeningHour({
          establishment: `api/establishments/${establishment.id}`,
          startTime: `${openingHours[day].from}:00`,
          endTime: `${openingHours[day].to}:00`,
          day,
        }));
      } else {
        promiseArray.push(patchOpeningHour(openingHours[day].id, {
          startTime: `${openingHours[day].from}:00`,
          endTime: `${openingHours[day].to}:00`,
        }));
      }
    });
    await Promise.all(promiseArray);
    await getById(establishment.id);
  };

  return (
    <>
      <div className={styles.OpeningHoursSelector}>
        {Object.entries(openingHours).map(([ day, hours ]) => (
          <div key={day} className={[ styles.OpeningHoursSelectorRow ].concat(openingDays.includes(day) ? styles.OpeningHoursSelectorRowActive : []).join(' ')}>
            <input className={styles.OpeningHoursSelectorRowCheckbox} type="checkbox" checked={openingDays.includes(day)} onChange={(e) => { e.target.checked ? setOpeningDays((old) => [ ...old, day ]) : setOpeningDays((old) => old.filter((d) => d !== day)); }} />
            <div className={styles.OpeningHoursSelectorRowDay}>
              {t(`weekDays.${day}`)}
            </div>
            <div className={styles.OpeningHoursSelectorRowHours}>
              <input type="text" name="" id="" placeholder="9:00" disabled={!openingDays.includes(day)} value={openingHours[day].from} onChange={(e) => setOpeningHours((old) => ({ ...old, [day]: { ...old[day], from: e.target.value } }))} />
            -
              <input type="text" name="" id="" placeholder="18:00" disabled={!openingDays.includes(day)} value={openingHours[day].to} onChange={(e) => setOpeningHours((old) => ({ ...old, [day]: { ...old[day], to: e.target.value } }))} />
            </div>
          </div>
        ))}
      </div>
      {( isPatchOpeningHourLoading || isPostOpeningHourLoading || isEstablishmentLoading )
        ? <span>{t('applingChanges')}</span>
        : <Button onClick={sendRequest}>{t('send')}</Button>
      }
    </>
  );
}

