import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Cells from '../cells/index';
import WeekDays from '../weekDays/index'
import HeaderCalendar from '../headerCalendar/index'
import generateDates from '../../utils/generateCalendar.jsx'

import './calendar.sass'

function Calendar() {
  let [cells, setCells] = useState([]);
  let [currentMonth, setCurrentMonth] = useState(moment());

  useEffect(() => {
    setCells(generateDates(currentMonth));
  }, [currentMonth]);

  const changeMonth = (action) => {
    if (action === 'prev') {
      setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    }

    if (action === 'next') {
      setCurrentMonth(currentMonth.clone().add(1, 'month')); 
    }
  }

  return (
    <>
      <HeaderCalendar changeMonth={changeMonth} currentMonth={currentMonth}/>
      <div className='calendar__body'>
        <div className="calendar__list-days">
          <WeekDays />
        </div>
        <div className='calendar__cells'>
          <Cells days={cells} />
        </div>
        <div className='calendar__delete-reminders' />
      </div>
    </>
  );
}

export default Calendar;