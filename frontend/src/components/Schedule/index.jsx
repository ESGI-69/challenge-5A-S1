import React from 'react';
import { useState } from 'react';
import styles from './Schedule.module.scss';
import EmptyArrow from '../lib/Icons/EmptyArrow';

const Schedule = React.forwardRef(function Schedule(
  {
    schedule,
    children,
    ...delegated
  },
  ref,
){

  const [ currentWeek, setCurrentWeek ] = useState(0);

  const fakeDivs = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
  ];

  const handleArrowClick = (direction) => {
    if (direction === 'prev') {
      setCurrentWeek((prevWeek) => Math.max(prevWeek - 1, 0));
    } else if (direction === 'next') {
      setCurrentWeek((prevWeek) => Math.min(prevWeek + 1, fakeDivs.length - 1));
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
            <div className={styles.ColumnsContainer}>

              {fakeDivs.map((div, index) => (
                <div className={styles.Column} key={index}>
                  <div className={styles.ColumnHeader}>
                    <span className={styles.ColumnTitle}>Lundi</span>
                    <span className={styles.ColumnDate}>14 dec.</span>
                  </div>
                  <div className={styles.ColumnBody}>
                    <button className={styles.ColumnButton}>10:00</button>
                    <button className={styles.ColumnButton}>10:30</button>
                    <button className={styles.ColumnButton}>11:00</button>
                    <button className={styles.ColumnButton}>11:30</button>
                  </div>
                </div>
              ))}

            </div>

            <div className={styles.ColumnsContainer}>

              {fakeDivs.map((div, index) => (
                <div className={styles.Column} key={index}>
                  <div className={styles.ColumnHeader}>
                    <span className={styles.ColumnTitle}>Lundi</span>
                    <span className={styles.ColumnDate}>14 dec.</span>
                  </div>
                  <div className={styles.ColumnBody}>
                    <button className={styles.ColumnButton}>10:00</button>
                    <button className={styles.ColumnButton}>10:30</button>
                    <button className={styles.ColumnButton}>11:00</button>
                    <button className={styles.ColumnButton}>11:30</button>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </div>

      </div>
    </>
  );
});

export default Schedule;
