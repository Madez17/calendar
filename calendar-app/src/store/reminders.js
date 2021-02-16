// Action Types
const CREATE_REMINDER = 'createReminder';
const EDIT_REMINDER = 'editReminder';
const DELETE_REMINDER = 'deleteReminder';
const DELETE_DAY_REMINDERS = 'deleteDayReminders';

// Action Creators
export const createReminder = (reminder) => {
  return {
    type: CREATE_REMINDER,
    payload: reminder
  }
};

export const editReminder = (reminder) => ({
  type: EDIT_REMINDER,
  payload: {
    ...reminder
  }
});

export const deleteReminder = (id) => ({
  type: DELETE_REMINDER,
  payload: {
    id
  }
});

export const deleteDayReminders = (date) => ({
  type: DELETE_DAY_REMINDERS,
  payload: {
    date
  }
});

// Reducer
let lastIdReminder = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case CREATE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.concat({
            ...action.payload,      
            id: ++lastIdReminder
          }
        )
      };
    case EDIT_REMINDER:
      return {
        ...state,
        reminders: state.reminders.map((reminder) => 
          reminder.id !== action.payload.id ? reminder : {...reminder, ...action.payload}
        )
      };
    case DELETE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.filter((reminder) => reminder.id !== action.payload.id)
      };
    case DELETE_DAY_REMINDERS:
      return {
        ...state,
        reminders: state.reminders.filter((reminder) => {
          return reminder.date !== action.payload.date
        })
      };
    default:
      return state;
  }
}