import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import Weather from '../../utils/api';
import validateReminder from '../../utils/validateReminder';
import './reminder.sass';

function ReminderModal({closeModal, eventReminder, reminderToEdit} ) {
  const [id] = useState(reminderToEdit && reminderToEdit.id || '');
  const [description, setDescription] = useState(reminderToEdit && reminderToEdit.description || '');
  const [city, setCity] = useState(reminderToEdit && reminderToEdit.city || '');
  const [weather, setWeather] = useState(null);
  const [iconWeather, setIconWeather] = useState(null);
  const [color, setColor] = useState(reminderToEdit && reminderToEdit.color || 'blue-ligth');
  const [date, setDate] = useState(reminderToEdit && reminderToEdit.date || new Date());
  const [hour, setHour] = useState(reminderToEdit && reminderToEdit.time.substring(0, 2) || '');
  const [minutes, setMinutes] = useState(reminderToEdit && reminderToEdit.time.substring(3,5) || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if(reminderToEdit && reminderToEdit.date) {
      setDate(reminderToEdit.date)
    }
  }, []);

  const handleEventReminder = (type) => {
    const time = `${hour}:${minutes}`;
    const formatDate = new Date(date);
    const dataReminder = {
      id: id || 0,
      description,
      city,
      color,
      date: moment(formatDate).format('MM DD YYYY'),
      timeInMilliseconds: hour && minutes ? (hour * 3600) + (minutes * 60) : '',
      time: hour && minutes ? moment(time, 'HH:mm').format('hh:mm a') : ''
    };

    const validReminder = validateReminder(dataReminder);
    if (validReminder === true) {
      eventReminder(dataReminder, type);
    } else {
      setError(validReminder);
    }
  }

  const handleCity = async (element) => {
    const value = element.target.value;
    setCity(value);
    const data = await Weather(value);
    setWeather(data.main)
    setIconWeather(data.icon)
  }

  const getTimeOptions = (limit, type) => {
    const timeOptions = [];
    timeOptions.push(<option key={type} value={''} disabled>{type}</option>)
    for (let i = 0; i <= limit; i++) {
      let valueOption = i <= 9 ? `0${i}`: i;
      timeOptions.push(<option key={`${i}-${type}`} value={valueOption}>{valueOption}</option>);
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
                onChange={(element) => handleCity(element) }
                defaultValue={reminderToEdit && reminderToEdit.city || 'city'}
              >
                <option value='city' disabled>City</option>
                <option value='bogota'>Bogotá</option>
                <option value='medellin'>Medellín</option>
                <option value='cali'>Cali</option>
                <option value='barranquilla'>Barranquilla</option>
                <option value='tunja'>Tunja</option>
              </select>
              {iconWeather &&  weather && (
                <>
                  <div className='modal__body__weather'>
                    <p className='modal__body__weather-title'>{weather}</p>
                    <img src={`http://openweathermap.org/img/wn/${iconWeather}@2x.png`} alt=""/>
                  </div>
                </>
              )}
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

            <div className="modal__body__date">
              <DatePicker
                onChange={(date) => {setDate(date)}}
                value={moment(date).toDate()}
              />
            </div>

            <div className="modal__container modal__body__time">
              <select
                onChange={(element) => {
                  setHour(element.target.value)}
                } 
                defaultValue={hour}
              >
                {getTimeOptions(24, 'hours')}
              </select>:
              <select
                onChange={(element) => {
                  setMinutes(element.target.value)
                }}
                defaultValue={minutes}
              >
                {getTimeOptions(59, 'minutes')}
              </select>
            </div>
          </div>
          <div className='modal__footer'>
            <p>{error}</p>
            <button onClick={closeModal} className='modal__control'>Cancel</button>
            <button
              onClick={() => handleEventReminder(reminderToEdit ? 'edit': 'create')}
              className='modal__control'
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