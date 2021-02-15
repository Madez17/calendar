import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteAllReminder } from '../../store/reminders';
import Cells from '../cells/index';
import WeekDays from '../weekDays/index'
import HeaderCalendar from '../headerCalendar/index'
import generateDates from '../../utils/generateCalendar.jsx'
import wheather from '../../utils/api';

import './calendar.sass'

function Calendar({dispatchDeleteAllReminder}) {
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

   const data = wheather().then(data => {
     console.log(data);
   })

   console.log(data);
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
          <div className='calendar__delete-reminders'>
            {/* <span onClick={dispatchDeleteAllReminder}><i className="fas fa-trash-alt trash"></i> Delete all reminders</span> */}
          </div>
      </div>
    </>
  );
}


const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteAllReminder: () => {
    dispatch(deleteAllReminder())
  }
})

export default connect(null, mapDispatchToProps)(Calendar);
