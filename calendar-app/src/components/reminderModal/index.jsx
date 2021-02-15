import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import './reminder.sass';

function ReminderModal({closeModal, eventReminder, reminderToEdit} ) {
  const [id] = useState(reminderToEdit && reminderToEdit.id || '');
  const [description, setDescription] = useState(reminderToEdit && reminderToEdit.description || '');
  const [city, setCity] = useState(reminderToEdit && reminderToEdit.city || '');
  const [color, setColor] = useState(reminderToEdit && reminderToEdit.color || 'blue-ligth');
  const [date, setDate] = useState(reminderToEdit && reminderToEdit.date || new Date());
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    if(reminderToEdit && reminderToEdit.date) {
      setDate(reminderToEdit.date)
    }
  }, []);

  const handleEventReminder = (type) => {
    const formatMinutes = minutes <= 9 ? `0${minutes}` : minutes;
    const formatHour = hour <= 9 ? `0${hour}` : hour;
    const time = `${formatHour}:${formatMinutes}`;
    const formatDate = new Date(date);

    const dataReminder = {
      id,
      description,
      city,
      color,
      date: moment(formatDate).format('MM DD YYYY'),
      time,
    };
    eventReminder(dataReminder, type);
  }

  const getTimeOptions = (limit, type) => {
    const timeOptions = [];
    timeOptions.push(<option key={type} value={type} disabled>{type}</option>)
    for (let i = 1; i <= limit; i++) {
      timeOptions.push(<option key={`${i}-${type}`} value={i}>{i <= 9 ? `0${i}`: i}</option>);
    }
    return timeOptions;
  }


  return (
    <>
      <div className='modal'>
        <div className='modal__content'>
          <div className='modal__header'>
            <h2>Reminder</h2>
            <span onClick={closeModal}>
              <i className='fas fa-times'></i>
            </span>
          </div>

          <input
            placeholder='Create your reminder'
            maxLength = '30'
            onChange={(element) => setDescription(element.target.value)}
            defaultValue={reminderToEdit && reminderToEdit.description || ''}
          />

          <div className='modal__body'>
            <div className='modal__container modal__body__city'>
              <select
                onChange={(element) => setCity(element.target.value)}
                defaultValue={reminderToEdit && reminderToEdit.city || 'city'}
              >
                <option value='city' disabled>City</option>
                <option value='bogota'>Bogotá</option>
                <option value='medellin'>Medellín</option>
                <option value='cali'>Cali</option>
              </select>
            </div>

            <div className='modal__container modal__body__color'>
              <select
                onChange={(element) => setColor(element.target.value)}
                defaultValue={reminderToEdit && reminderToEdit.color || 'color'}
              >
                <option value='color' disabled>Color</option>
                <option value='blue'>Blue</option>
                <option value='blue-ligth'>Blue Light</option>
                <option value='pink'>Pink</option>
              </select>
            </div>

            {/* <div className='modal__container modal__body__day'>
              <select>
                {days()}
              </select>
            </div> */}

            <div className="modal__body__date">
              <DatePicker
                onChange={(date) => {setDate(date)}}
                value={moment(date).toDate()}
              />
            </div>

            <div className="modal__container modal__body__time">
              <select
                onChange={(element) => setHour(element.target.value)}
                defaultValue={'Hours'}
              >
                {getTimeOptions(24, 'Hours')}
              </select>:
              <select
                onChange={(element) => setMinutes(element.target.value)}
                defaultValue={'Minutes'}
              >
                {getTimeOptions(59, 'Minutes')}
              </select>
            </div>
          </div>
          <div className='modal__footer'>
            <button onClick={closeModal} className='modal__control'>Cancel</button>
            <button
              onClick={() => handleEventReminder(reminderToEdit ? 'edit': 'create')}
              className='modal__control'
              // disabled={!description && !city && !hour && !minutes}
            >
              {reminderToEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReminderModal;