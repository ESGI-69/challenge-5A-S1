import React from 'react';
import { useState } from 'react';
import styles from './Schedule.module.scss';
import EmptyArrow from '../lib/Icons/EmptyArrow';

const Schedule = React.forwardRef(function Schedule(
  {
    schedule,
    personSelected,
    onDateSelect,
    children,
    ...delegated
  },
  ref,
){

  const [ currentWeek, setCurrentWeek ] = useState(0);

  const handleArrowClick = (direction) => {
    if (direction === 'prev') {
      setCurrentWeek((prevWeek) => Math.max(prevWeek - 1, 0));
    } else if (direction === 'next') {
      setCurrentWeek((prevWeek) => Math.min(prevWeek + 1, schedule.length - 1));
    }
  };

  return (
    <>
      <div className={styles.Schedule}>
        <div className={styles.ScheduleArrows}>
          <span className={styles.ScheduleArrowsLeft}  onClick={() => handleArrowClick('prev')}><EmptyArrow style={{ width:40 }} /></span>
          <span className={styles.ScheduleArrowsRight}  onClick={() => handleArrowClick('next')}><EmptyArrow style={{ width:40 }} /></span>
        </div>
        <div className={styles.ScrollContainer}>
          <div className={styles.FlexContainer} style={{ transform: `translateX(${currentWeek * -100}%)` }}>

            {schedule.map((page, index) => (
              <>
                <div key={index}>
                </div>
                <div className={styles.ColumnsContainer}>

                  {page.days.map((day, index) => (
                    <div className={styles.Column} key={index}>
                      <div className={styles.ColumnHeader}>
                        <span className={styles.ColumnTitle}>{new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long' })}</span>
                        <span className={styles.ColumnDate}>        {new Date(day.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className={styles.ColumnBody}>
                        {day.times.map((appointement, index) =>
                          (
                            <button
                              key={index}
                              className={appointement.available ? `${styles.ColumnButton}`: `${styles.ColumnButton} ${styles.ColumnButtonDisabled}`}
                              onClick={() => {
                                if (appointement.available) {
                                  const selectedDate = new Date(`${day.date}T${appointement.time}:00.000Z`);
                                  onDateSelect(selectedDate, appointement.employee);
                                }
                              }}
                            >
                              {appointement.time}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  ))}

                </div>

              </>

            ))}

          </div>
        </div>

      </div>
    </>
  );
});

export default Schedule;
