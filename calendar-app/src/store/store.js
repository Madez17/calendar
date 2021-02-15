import { createStore } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reminders';

function configStore() {
  const initialStore = {
    reminders: [
      // {
      //   id: 1,
      //   description: 'Mi Primer Reminder',
      //   color: 'pink',
      //   date: new Date(2021,1,13),
      //   time: 'here'
      // },
      // {
      //   id: 2,
      //   description: 'Reminder Mafe Si estoy aprend',
      //   city: 'medellin',
      //   color: 'blue',
      //   date: new Date(2021,1,17)
      // },
      // {
      //   id: 3,
      //   description: 'Reminder Mafe 2',
      //   color: 'blue-ligth',
      //   date: new Date(2021,1,17)
      // },
      // {
      //   id: 4,
      //   description: 'Reminder Mafe 3',
      //   color: 'pink',
      //   date: new Date(2021,1,17)
      // },
      // {
      //   id: 5,
      //   description: 'Reminder Mafe 4',
      //   color: 'blue-ligth',
      //   date: new Date(2021,1,17)
      // },
      // {
      //   id: 6,
      //   description: 'Reminder Mafe 5',
      //   color: 'blue-ligth',
      //   date: new Date(2021,1,17)
      // },
      // {
      //   id: 7,
      //   description: 'Reminder Mafe 6',
      //   color: 'blue-ligth',
      //   date: new Date(2021,1,17)
      // },
      // {
      //   id: 8,
      //   description: 'Reminder Mafe 7',
      //   color: 'blue-ligth',
      //   date: new Date(2021,1,17)
      // }
    ]
  };
  const store = createStore(reducer, initialStore, composeWithDevTools());
  return store;
};

export default configStore;