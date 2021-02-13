function HeaderCalendar(props) {

  return (
    <>
      <h1 className='App__title'><i className="fas fa-calendar-alt"></i> Calendar </h1>

      <div className='calendar__header'>
        <button
          className='calendar__control calendar__control--prev'
          onClick={() => { props.changeMonth('prev') }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <span className="calendar__month-name">{props.currentMonth.format('MMM YYYY')}</span>

        <button
          className='calendar__control calendar__control--next'
          onClick={() => { props.changeMonth('next') }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </>
  );
}

export default HeaderCalendar;