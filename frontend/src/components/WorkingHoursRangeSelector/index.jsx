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
      services: [],
    },
    tuesday: {
      day: 'tuesday',
      from: '',
      to: '',
      services: [],
    },
    wednesday: {
      day: 'wednesday',
      from: '',
      to: '',
      services: [],
    },
    thursday: {
      day: 'thursday',
      from: '',
      to: '',
      services: [],
    },
    friday: {
      day: 'friday',
      from: '',
      to: '',
      services: [],
    },
    saturday: {
      day: 'saturday',
      from: '',
      to: '',
      services: [],
    },
    sunday: {
      day: 'sunday',
      from: '',
      to: '',
      services: [],
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
          services: hour.services,
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
          services: workingHoursRange[day].services
            .filter((s) => employee.preferedEstablishment.services.some((service) => service.id === s.id))
            .map((s) => `api/services/${s.id}`),
        }));
      } else {
        promiseArray.push(patchWorkingHoursRange(workingHoursRange[day].id, {
          startDate: `${workingHoursRange[day].from}:00`,
          endDate: `${workingHoursRange[day].to}:00`,
          services: workingHoursRange[day].services
            .filter((s) => employee.preferedEstablishment.services.some((service) => service.id === s.id))
            .map((s) => `api/services/${s.id}`),
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
            {( employee.preferedEstablishment.services && employee.preferedEstablishment.services.length > 0 ) && (
              <div className={styles.WorkingHoursRangeSelectorRowServices}>
                <ul className={styles.WorkingHoursRangeSelectorRowServicesList}>
                  {employee.preferedEstablishment.services.map((service) => (
                    <li key={service.id}>
                      <input
                        type="checkbox"
                        value={service.id}
                        checked={workingHoursRange[day].services.some(s => s.id === service.id)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setWorkingHoursRange((old) => ({
                            ...old,
                            [day]: {
                              ...old[day],
                              services: isChecked
                                ? old[day].services.includes(service)
                                  ? old[day].services
                                  : old[day].services.concat(service)
                                : old[day].services.filter(s => s.id !== service.id),
                            },
                          }));
                        }}
                      />
                      {service.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={styles.WorkingHoursRangeSelectorRowHours}>
              <input type="text" name="" id="" placeholder="9:00" disabled={!workingDays.includes(day)} value={workingHoursRange[day].from || '09:00'} onChange={(e) => setWorkingHoursRange((old) => ({ ...old, [day]: { ...old[day], from: e.target.value } }))} />
            -
              <input type="text" name="" id="" placeholder="18:00" disabled={!workingDays.includes(day)} value={workingHoursRange[day].to || '18:00'} onChange={(e) => setWorkingHoursRange((old) => ({ ...old, [day]: { ...old[day], to: e.target.value } }))} />
            </div>
          </div>
        ))}
      </div>
      {( isPatchWorkingHoursRangeLoading || isPostWorkingHoursRangeLoading || isEmployeeLoading )
        ? <span>{t('applingChanges')}</span>
        : <Button onClick={sendRequest}>{t('update', { ns: 'base' })}</Button>
      }
    </>
  );
}

