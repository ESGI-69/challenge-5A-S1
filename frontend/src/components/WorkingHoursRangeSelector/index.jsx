import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WorkingHoursRangeSelector.module.scss';
import Button from '../lib/Button';
import { EmployeeContext } from '@/contexts/api/EmployeeContext';

export default function WorkingHoursRangeSelector() {
  const { t } = useTranslation('base');
  const { getById, isEmployeeLoading, postWorkingHoursRange, employee, patchWorkingHoursRange, isPostWorkingHoursRangeLoading, isPatchWorkingHoursRangeLoading } = useContext(EmployeeContext);
  const [ workingHoursRange, setWorkingHoursRange ] = useState({
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
    employee.workingHoursRanges.forEach((hour) => {
      setWorkingHoursRange((old) => ({
        ...old,
        [hour.day]: {
          from: `${hour.startDate.split('T')[1].split(':')[0]  }:${  hour.startDate.split('T')[1].split(':')[1]}`,
          to: `${hour.endDate.split('T')[1].split(':')[0]  }:${  hour.endDate.split('T')[1].split(':')[1]}`,
          id: hour.id || undefined,
        },
      }));
      if (!workingDays.includes(hour.day)) setWorkingDays((old) => [ ...old, hour.day ]);
    });
  }, [ employee.workingHoursRanges ]);

  const [ workingDays, setWorkingDays ] = useState([]);

  const sendRequest = async () => {
    const promiseArray = [];

    workingDays.forEach((day) => {
      if (!workingHoursRange[day].id) {
        promiseArray.push(postWorkingHoursRange({
          employee: `api/employees/${employee.id}`,
          startDate: `${workingHoursRange[day].from}:00`,
          endDate: `${workingHoursRange[day].to}:00`,
          day,
        }));
      } else {
        promiseArray.push(patchWorkingHoursRange(workingHoursRange[day].id, {
          startDate: `${workingHoursRange[day].from}:00`,
          endDate: `${workingHoursRange[day].to}:00`,
        }));
      }
    });
    await Promise.all(promiseArray);
    await getById(employee.id);
  };

  return (
    <>
      <div className={styles.WorkingHoursRangeSelector}>
        {Object.entries(workingHoursRange).map(([ day ]) => (
          <div key={day} className={[ styles.WorkingHoursRangeSelectorRow ].concat(workingDays.includes(day) ? styles.WorkingHoursRangeSelectorRowActive : []).join(' ')}>
            <input className={styles.WorkingHoursRangeSelectorRowCheckbox} type="checkbox" checked={workingDays.includes(day)} onChange={(e) => { e.target.checked ? setWorkingDays((old) => [ ...old, day ]) : setWorkingDays((old) => old.filter((d) => d !== day)); }} />
            <div className={styles.WorkingHoursRangeSelectorRowDay}>
              {t(`weekDays.${day}`)}
            </div>
            <div className={styles.WorkingHoursRangeSelectorRowHours}>
              <input type="text" name="" id="" placeholder="9:00" disabled={!workingDays.includes(day)} value={workingHoursRange[day].from} onChange={(e) => setWorkingHoursRange((old) => ({ ...old, [day]: { ...old[day], from: e.target.value } }))} />
            -
              <input type="text" name="" id="" placeholder="18:00" disabled={!workingDays.includes(day)} value={workingHoursRange[day].to} onChange={(e) => setWorkingHoursRange((old) => ({ ...old, [day]: { ...old[day], to: e.target.value } }))} />
            </div>
          </div>
        ))}
      </div>
      {( isPatchWorkingHoursRangeLoading || isPostWorkingHoursRangeLoading || isEmployeeLoading )
        ? <span>{t('applingChanges')}</span>
        : <Button onClick={sendRequest}>{t('send')}</Button>
      }
    </>
  );
}

