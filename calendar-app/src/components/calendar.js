import React, { useState, useEffect } from 'react';
import moment from 'moment';

import './calendar.sass'

function Calendar() {
  let [cells, setCells] = useState([]);
  let [currentMonth, setCurrentMonth] = useState(moment());

  let nameDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    generateDate(currentMonth);
  }, [currentMonth]);

  const changeMonth = (action) => {
    if (action === 'prev') {
      setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    }

    if (action === 'next') {
      setCurrentMonth(currentMonth.clone().add(1, 'month')); 
    }
  }

  const generateDate = (monthToShow = moment()) => {
    let cellsData = [];

    if (!moment.isMoment(monthToShow)) {
      return null;
    }

    let dateStart = moment(monthToShow).startOf('month');
    let dateEnd = moment(monthToShow).endOf('month');

    while(dateStart.day() !== 0 ) {
      dateStart.subtract(1, 'days');
    }

    while(dateEnd.day() !== 1) {
      dateEnd.add(1, 'days');
    }

    do {
      cellsData.push({
        date: moment(dateStart),
        isCurrentMonth: dateStart.month() === monthToShow.month()
      });
      dateStart.add(1, 'days')
    } while(dateStart.isSameOrBefore(dateEnd));

    setCells(cellsData);
  }

  return (
    <>
      <h1>Calendar <i className="fas fa-calendar-alt"></i> <br></br></h1>

      <div className='calendar__header'>
        <button
          className='calendar__control calendar__control--prev'
          onClick={() => { changeMonth('prev') }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <span className="calendar__month-name">{currentMonth.format('MMM YYYY')}</span>

        <button
          className='calendar__control calendar__control--next'
          onClick={() => { changeMonth('next') }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className='calendar__body'>
        <div className="calendar__list-days">
          {
            nameDays.map((day, index) => (
              <div key={index} className='calendar__days'>
                {day}
              </div>
            ))
          }
        </div>
        <div className='calendar__cells'>
          {
            !cells ? <p>Not Generate calendar data</p> :
              cells.map((cell, index) => (
                <p key={index} className='calendar__cell'>
                  {cell.date.date()}
                </p>
              ))
          }
          {/* <Cells data={cells} /> */}
        </div>
      </div>
    </>
  );
}

export default Calendar;