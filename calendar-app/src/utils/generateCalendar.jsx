import moment from 'moment'

function generateDates (monthToShow = moment()) {
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

  return cellsData;
}

export default generateDates;