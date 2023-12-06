import React from 'react';
import styles from './Schedule.module.scss';

const Schedule = React.forwardRef(function Schedule(
  {
    children,
    ...delegated
  },
  ref,
){

  return (
    <h2>Schedule</h2>
  );
});

export default Schedule;
