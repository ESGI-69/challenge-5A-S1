import React from 'react';
import styles from './Schedule.module.scss';

const Schedule = React.forwardRef(function Schedule(
  {
    schedule,
    children,
    ...delegated
  },
  ref,
){

  const fakeDivs = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
  ];

  return (
    <>
      <div className={styles.Schedule}>
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
    </>
  );
});

export default Schedule;
