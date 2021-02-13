import React, { useState } from 'react';
import ReminderModal from '../Reminder/index';

function Cells({days}) {
  const [isOpen, setIsOpen] = useState(false);

  const reminders = [
    {
      id: 1,
      description: 'Mi Primer Reminder',
      color: 'pink',
      date: 13
    },
    {
      id: 2,
      description: 'Reminder Mafe Si estoy aprend',
      color: 'blue',
      date: 17
    },
    {
      id: 3,
      description: 'Reminder Mafe 2',
      color: 'blue-ligth',
      date: 17
    },
    {
      id: 4,
      description: 'Reminder Mafe 3',
      color: 'pink',
      date: 17
    },
    {
      id: 5,
      description: 'Reminder Mafe 4',
      color: 'blue-ligth',
      date: 17
    },
    {
      id: 6,
      description: 'Reminder Mafe 5',
      color: 'blue-ligth',
      date: 17
    },
    {
      id: 7,
      description: 'Reminder Mafe 6',
      color: 'blue-ligth',
      date: 17
    },
    {
      id: 8,
      description: 'Reminder Mafe 7',
      color: 'blue-ligth',
      date: 17
    }
  ];

  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const createReminder = () => {
    setIsOpen(false);
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
                reminders.map((reminder, index) => {
                  if (cell.date.date() === reminder.date)
                    return (
                      <div className={`calendar__reminder calendar__reminder--${reminder.color}`}>
                        <span>{reminder.description}</span>
                        <div className='calendar__icons'>
                          <span><i className='fas fa-trash-alt trash'></i></span>
                          <span><i className={`fas fa-pencil-alt pencil pencil--${reminder.color}`}></i></span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <button onClick={openModal} className="calendar__cell--reminder"><i className="fas fa-plus"></i> <br></br></button>
          </div>
        ))
      }

      {isOpen && <ReminderModal closeModal={closeModal} createReminder={createReminder} />}
    </>
    
  )
}

export default Cells;