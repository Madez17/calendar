import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  createReminder,
  editReminder,
  deleteReminder,
  deleteDayReminders
} from '../../store/reminders';
import PropTypes from 'prop-types';
import ReminderModal from '../reminderModal/index';

function Cells({
  days,
  reminders,
  dispatchCreateReminder,
  dispatchEditReminder,
  dispatchDeleteReminder,
  dispatchDeleteDayReminders
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [reminderToEdit, setReminderToEdit] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setReminderToEdit(null);
  }

  const openModal = () => {
    setIsOpen(true);
    setReminderToEdit(null);
  }

  const handleEventReminder = (dataReminder, type) => {
    if (type  === 'create') {
      dispatchCreateReminder(dataReminder);
    }

    if (type  === 'edit') {
      dispatchEditReminder(dataReminder);
    }
    closeModal();
  }

  const handleEditReminder = (dataToEdit) => {
    openModal();
    setReminderToEdit(dataToEdit);
  }
  
  return (
    <>
      {
        !days ? <p>Not Generate calendar data</p> :
        days.map((cell, index) => ( 
          <div key={index} className={`calendar__cell ${!cell.isCurrentMonth ? 'calendar__cell--disable' : '' }`}>
            <p>{cell.date.date()}</p>
            <div className='calendar__container-reminders'>
              {
                reminders
                .sort((remA, remB) => remA.timeInMilliseconds - remB.timeInMilliseconds)
                .map((reminder, index) => {
                  if (cell.date.format('MM DD YYYY') === moment(reminder.date).format('MM DD YYYY')) {
                    return (
                      <>
                      {index <= 1 && (
                        <span className='calendar__cell-trash' onClick={() => dispatchDeleteDayReminders(cell.date.format('MM DD YYYY'))}>
                          <i className="fas fa-trash-alt trash"></i>
                        </span>
                      )}
                      <div key={index} className={`calendar__reminder calendar__reminder--${reminder.color}`}>
                        <p className='calendar__hour'>{reminder.time}</p>
                        <span>{reminder.description}</span>
                        <div className='calendar__icons'>
                          <span onClick={() => dispatchDeleteReminder(reminder.id)}>
                            <i className='fas fa-trash-alt trash'></i>
                          </span>
                          <span onClick={() => handleEditReminder(reminder)}>
                            <i className={`fas fa-pencil-alt pencil pencil--${reminder.color}`}></i>
                          </span>
                        </div>
                      </div>
                      </>
                    )}
                  })
                }
              </div>
              <button onClick={openModal} className="calendar__cell--reminder">
                <i className="fas fa-plus"></i>
              </button>
          </div>
        ))
      }
      {isOpen && <ReminderModal reminderToEdit={reminderToEdit} closeModal={closeModal} eventReminder={handleEventReminder} />}
    </>
    
  )
}

Cells.propTypes = {
  days: PropTypes.array,
  reminders: PropTypes.array,
  dispatchCreateReminder: PropTypes.func,
  dispatchEditReminder: PropTypes.func,
  dispatchDeleteReminder: PropTypes.func
}

const mapStateToProps = (state) => ({
  reminders: state.reminders
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateReminder: (dataReminder) => {
    dispatch(createReminder(dataReminder))
  },
  dispatchEditReminder: (dataReminder) => {
    dispatch(editReminder(dataReminder))
  },
  dispatchDeleteReminder: (reminderId) => {
    dispatch(deleteReminder(reminderId))
  },
  dispatchDeleteDayReminders: (date) => {
    dispatch(deleteDayReminders(date))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cells);