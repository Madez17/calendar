
function WeekDays() {
  const nameDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    nameDays.map((day, index) => (
      <div key={index} className='calendar__days'>
        {day}
      </div>
    ))
  );
}

export default WeekDays;