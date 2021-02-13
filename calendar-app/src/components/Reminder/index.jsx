import React from 'react'
import './reminder.sass'

function ReminderModal({closeModal, createReminder} ) {
  const days = () => {
    let listDays = [];

    for (let i = 1; i <= 31; i++) {
      listDays.push(<option key={i} value={i}>{i}</option>)
    }

    return listDays;
  }

  return (
    <>
      <div className='modal'>
        <div className='modal__content'>
          <div className='modal__header'>
            <h2>Reminder</h2>
            <span onClick={closeModal}><i className='fas fa-times'></i></span>
          </div>

          <input placeholder='Create your reminder' maxLength = '30' />

          <div className='modal__body'>
            <div className='modal__container modal__body__city'>
              <select>
                <option defaultValue value='bogota'>Bogotá</option>
                <option value='medellin'>Medellín</option>
                <option value='cali'>Cali</option>
              </select>
            </div>

            <div className='modal__container modal__body__color'>
              <select>
                <option defaultValue value='blue'>Blue</option>
                <option value='beige'>Beige</option>
                <option value='pink'>Pink</option>
              </select>
            </div>

            <div className='modal__container modal__body__day'>
              <select>
                {days()}
              </select>
            </div>

          </div>
          <div className='modal__footer'>
            <button onClick={closeModal} className='modal__control'>Cancel</button>
            <button onClick={createReminder} className='modal__control'>Create</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReminderModal;